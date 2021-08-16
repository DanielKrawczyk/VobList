"use strict";
const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(cors());

let data = [];

function readData() {
    data = JSON.parse(fs.readFileSync('../src/data/data.json'));
};
readData();

function updateData() {
    fs.writeFileSync('../src/data/data.json', JSON.stringify(data));
    readData();
}

function validateRequestBody(data) {
    const schema = Joi.object({
        code: Joi.string().min(3).required(),
        title: Joi.string().min(3).required(),
        type: Joi.string().min(3).required()
    });
    const check = schema.validate(data);
    if (check.error) return 'NOT_VALID';
}

function updateVob(add) {
    const index = data.findIndex(item => item.code === add.code);
    if (index >= 0) return data[index] = add;
    return data.push(add);
}

function consoleInfo(type, data) {
    console.log('============== LOG ================');
    console.log(`Request handled! Method: ${type}, Data:`);
    console.log('----------------------------------');
    console.log(data);
    console.log('============ END LOG ==============');
}

function returnProperData(type = 'all') {
    if (type !== 'all') return data.filter(item => item.type === type);
    return data;
}

function deleteVob(del) {
    const index = data.findIndex(item => item.code === del);
    if (index < 0) return 'NOT_FOUND';
    data.splice(index, 1);
}

app.get('/:type', (req, res) => {
    const type = req.params.type;
    res.status(200).send({ code: 200, data: returnProperData(type) });
    consoleInfo('GET', type);
});

app.post('/', (req, res) => {
    const valid = validateRequestBody(req.body);
    if (valid === 'NOT_FOUND') return res.status(400).send({ code: 400, error: 'Not valid' });

    updateVob(req.body);
    res.status(201).send({ code: 201, data: req.body });
    consoleInfo('POST', req.body);
    updateData();
});

app.delete('/', (req, res) => {
    const del = deleteVob(req.body.code);
    console.log(req.body.code)

    if (del === 'NOT_FOUND') return res.status(404).send({ code: 404, error: 'Vob not found' });

    res.status(200).send({ code: 200, data: req.body })
    consoleInfo('DELETE', req.body);
    updateData();
});

app.listen(3333, () => {
    console.log('Listening!');
});
