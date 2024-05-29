let konyvek = [];
fetch("https://localhost:5001/Konyv")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cardContainer = document.getElementById("cardContainer");
        konyvek = [...data];
        data.forEach(Konyv => {
            console.log(konyvek.indexOf(Konyv));
            cardContainer.innerHTML += `
            <div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h3 class="card-title">${Konyv.nev}</h3>
                    <h2 class="card-subtitle mb-2 text-muted">${Konyv.kiadasEve}</h2>
                    <p class="card-text">Könyv értékelése: ${Konyv.ertekeles}</p>
                    </div>
                    <img class="card-img-top" src="${Konyv.kepneve}" alt="Card image cap">
                    <button type="button" onclick="Torles(${Konyv.id})" class="btn btn-danger">Törlés</button>
<button type="button" onclick="Modositas(${Konyv.id}, '${Konyv.nev}', ${Konyv.kiadasEve}, ${Konyv.ertekeles}, '${Konyv.kepneve}')" class="btn btn-warning">Szerkesztés</button>

                  </div>
            `;
        });
    })
    .catch(error => console.error("Hiba történt a lekérés során:", error));

    document.getElementById('button1').addEventListener('click', () => {
        const nev = document.getElementById('name').value;
        const kiadasEve = document.getElementById('kiadev').value;
        const ertekeles = document.getElementById('ertekeles').value;
        const kepURL = document.getElementById('kepURL').value;
    
        const ujKonyv = {
            nev: nev,
            kiadasEve: kiadasEve,
            ertekeles: ertekeles,
            kepneve: kepURL
        };
    
        fetch('https://localhost:5001/Konyv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ujKonyv)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Siker:', data);
            alert('Könyv sikeresen hozzáadva!');
        })
        .catch(error => {
            console.error('Hiba történt:', error);
            alert('Hiba történt a könyv hozzáadása során.');
        });


    });
    
function Torles(id) {
    fetch(`https://localhost:5001/Konyv/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Könyv sikeresen törölve!');
            location.reload(); // Frissíti az oldalt, hogy azonnal látszódjon a változás
        } else {
            alert('Hiba történt a könyv törlése során.');
        }
    })
    .catch(error => console.error('Hiba történt:', error));
}

function Modositas(id, nev, kiadasEve, ertekeles, kepURL) {
    const ujID = Number(id)
    const ujNev = prompt('Kérem adja meg a könyv új nevét:', nev);
    const ujKiadasEve = Number(prompt('Kérem adja meg a könyv új kiadás évét:', kiadasEve));
    const ujErtekeles = Number(prompt('Kérem adja meg a könyv új értékelését:', ertekeles));
    const ujKepURL = prompt('Kérem adja meg a könyv új kép URL-jét:', kepURL);

    const modositottKonyv = {
        id:ujID,
        nev: ujNev,
        kiadasEve: ujKiadasEve,
        ertekeles: ujErtekeles,
        kepneve: ujKepURL
    };
console.log(modositottKonyv);
    fetch(`https://localhost:5001/Konyv/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modositottKonyv)
    })
    .then(response => {
        if (response.ok) {
            alert('Könyv sikeresen módosítva!');
            location.reload(); // Frissíti az oldalt, hogy azonnal látszódjon a változás
        } else {
            alert('Hiba történt a könyv módosítása során.');
        }
    })
    .catch(error => console.error('Hiba történt:', error));
}

