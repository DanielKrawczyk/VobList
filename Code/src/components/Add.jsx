import { useState } from "react";

function Add() {
    const [ warning, setWarning ] = useState({
        class: "hidden",
        text: ""
    });

    async function addNewVob() {

        const code = document.getElementById('code').value,
        title = document.getElementById('title').value,
        type = document.getElementById('type').value,
        request = {
            code: code,
            title: title,
            type: type
        }

        if (code.length < 3 || title.length < 3) {
            return setWarning({ class: "warning", text: "Wymagane są minimum 3 litery!" });
        } else if (code.length > 50 || title.length > 50) {
            return setWarning({ class: "warning", text: "Maksymalna liczba liter to 50!" })
        }

        try {
            const res = await fetch('http://localhost:3333/', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(request)
            });
            const data = res.json();
    
            if (res.status === 201)
                setWarning({ class: "success", text: "Pomyślnie dodano voba!" })
            else {
                setWarning({ class: "warning", text: "Coś poszło nie tak! " })
            }
            return data;
        } catch (err) {
            console.log(err);
            setWarning({ class:"warning", text:"Brak odpowiedzi z serwera! Upewnij się czy na pewno uruchomiłeś serwer dostępny w folderze \"server\" na porcie lokalnym 3333!" })
        }
    }

    return (
        <main className="add">
            <h1 className="add-title">DODAJ NOWEGO VOBA</h1>
            <div className="input-group input-group-lg m-3">
                <span className="input-group-text">Kod voba:</span>
                <input className="form-control" type="text" id="code" />
            </div>
            <div className="input-group input-group-lg m-3">
                <span className="input-group-text">Nazwa voba:</span>
                <input className="form-control" type="text" id="title" />
            </div>
            <div className="add-select">
                <select className="form-select" name="type" id="type" defaultValue="static">
                    <option value="static">Vob statyczny</option>
                    <option value="nature">Vob natury</option>
                    <option value="effects">Efekt wizualny</option>
                    <option value="sounds">Efekt dźwiękowy</option>
                </select>
            </div>
            <div className="add-btns">
                <button className="btn btn-primary mt-5" onClick={() => addNewVob()}>Dodaj</button>
            </div>
            <div className="add-warning">
                <p className={warning.class}>
                    {warning.text}
                </p>
            </div>
        </main>
    )
}

export default Add;