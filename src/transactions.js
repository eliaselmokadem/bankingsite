document.addEventListener("DOMContentLoaded", function() {
    const userId = sessionStorage.getItem('user_id');

    if (userId) {
        fetch(`http://localhost:3000/Transactions?user_Id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayTransactions(data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

function displayTransactions(tracs) {


    let container = document.getElementById("container");
    container.innerHTML = ``
    for (let i = 0; i < tracs.length; i++) {

        container.innerHTML += `
        <div class="tracs-container">
            Transactie nummer: ${tracs[i].Transaction_Id}
            <br>
            Naam: ${tracs[i].destinantName}
            <br>
            IBAN: ${tracs[i].destinantIBAN}
        </div>`
        
    }
    
}

