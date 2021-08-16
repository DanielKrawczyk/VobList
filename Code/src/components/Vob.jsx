import { useState } from 'react';

function Vob(props) {
    const [ state, setState ] = useState("bi bi-clipboard-plus");

    const { data } = props;
    const copy = data.code;

    function showCheckIcon() {
        setState("bi bi-check");
        setTimeout(() => {
            setState("bi bi-clipboard-plus");
        }, 2000);
    }

    function copyToClipboard() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(copy);
            showCheckIcon();
        } else if (window.clipboardData && window.clipboardData.setData) {
            window.clipboardData.setData('Text', copy);
            showCheckIcon();
        } else {
            const temp = document.createElement("input");
            temp.style.display = 'none';
            temp.value = copy;
            document.body.append(temp);
            temp.focus();
            temp.select();
            document.execCommand("copy");
            temp.remove();
            showCheckIcon();
        }
    }

    async function deleteVob() {
        const confirm = window.confirm('Do you really want to delete this vob?');
        if (confirm) {
            const req = {
                code: copy
            }
            const res = await fetch(`http://localhost:3333/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(req)
            });
            const data = res.json();

            if (res.status === 200) {
                window.alert('Vob usunięty!');
            } else {
                window.alert('Coś poszło nie tak! Sprawdź konsolę lub spróbuj ponownie!');
            }

            return data;
        }
    }

    return (
        <p className="list-vobs_item">
            <span className="list-vobs_item_code">
                <i className={state} onClick={() => {
                    copyToClipboard();
                }}></i>
                {data.code}
                &emsp;
                ({data.type})
            </span>
            <span className="list-vobs_item_title">
                {data.title}
                &emsp;
                <i className="bi bi-trash" onClick={() => {
                    deleteVob();
                }}></i>
            </span>
        </p>
    )
}

export default Vob;