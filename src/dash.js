document.addEventListener("DOMContentLoaded", function() {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
        fetch('http://localhost:3000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const client = data.find(client => client.user_id === userId);
                if (client) {
                    console.log("Client Data:", client);
                    displayClientInfo(client); 
                } else {
                    console.log("Client with the specified user_id not found.");
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
        console.log("User ID not found in session storage");
    }
});

function displayClientInfo(client) {
    const clientInfoContainer = document.getElementById("dashboard-container");
    
    const clientInfoHTML = `
        <div class="oversight">
        <h3>Welcome ${client.realname}!</h3>
        <a href="accounts.html" class="logout-link">Logout</a>
        </div>
    `;

    const clientAccountInfoHTML = `
        <div class="oversight">
        <p> Zichtrekening: ${client.checking_account_iban} </p>
        <h3> ${client.checking_account_balance} Euro </h3>
        <p> Spaarrekening: ${client.savings_account_iban} </p>
        <h3> ${client.savings_account_balance} Euro </h3>
        </div>
    `;

    const transactionsHTML = `
        <div class= oversight>
        <h3> overschrijvingen </h3>
        <br>
        <p>rekeningnummer:</p>
        <input type="text" id="rekeningnummer"></input>
        <br><br>
        <p>bedrag:</p>
        <input type="number" id="amount"></input>
        <br>
        <button class="logout-link" id="transferBtn">Send</button>
        </div>
    `

    clientInfoContainer.innerHTML = clientInfoHTML + clientAccountInfoHTML + transactionsHTML;
    transferBtn.addEventListener('click', function() {
        const destinantIban = document.getElementById('rekeningnummer').value;
        const amountValue = document.getElementById('amount').value;
    
        fetch('http://localhost:3000/updateAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                srcIban: client.checking_account_iban,
                iban: destinantIban,
                amount: parseFloat(amountValue)
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("source IBAN",client.checking_account_iban)
            console.log("Destination IBAN:", destinantIban);
            console.log("Amount:", amountValue);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        }); 

        });

        // voor history
        // voor history
    transferBtn.addEventListener('click', function() {
    const destinantIban = document.getElementById('rekeningnummer').value;
    const amountValue = document.getElementById('amount').value;
    
    fetch('http://localhost:3000/updateTransaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_Id : client.user_id,
            userName: client.realname,
            srcIban: client.checking_account_iban,
            iban: destinantIban,
            amount: parseFloat(amountValue)
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Destination IBAN:", destinantIban);
        console.log("Amount:", amountValue);
        console.log(data);
        // Handle other responses or UI updates here if necessary
    })
    .catch(error => {
        console.error('Error:', error);
        // Display user-friendly error message on the frontend
    }); 
});

}
