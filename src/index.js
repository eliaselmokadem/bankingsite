document.addEventListener("DOMContentLoaded", function() {
    let userNameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    let btn = document.getElementById("submitBtn");
    let loginstate = false;
    let error_message = document.getElementById("error-message");

    btn.addEventListener("click", async function() {
        try {
            const { success, user_id } = await jsonFetch('http://localhost:3000/users', userNameInput.value, passwordInput.value);
            
            if (success) {
                loginstate = true;
                if (loginstate) {
                    window.location.href = '../pages/dashboard.html';
                }
                exportUserId(user_id);
            } else {
                error_message.innerHTML = `<p>Username or password is incorrect</p>`;
                console.log("Username or password is incorrect");
            }

        } catch (error) {
            console.error(error);
            error_message.innerHTML = `<p>Error fetching data</p>`;
            console.log("Error fetching data");
        }
    });
});

async function jsonFetch(url, username, password) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching data');
            
        }

        const data = await response.json();

        console.log(data);

        for (let item of data) {
            if (item.username === username && item.userpassword === password) {
                return { success: true, user_id: item.user_id };
            }
        }
            
        return { success: false };

    } catch (error) {
        throw error;
    }
}



function exportUserId(userId) {
    sessionStorage.setItem('user_id', userId);
    console.log("Exporting user_id:", userId);
}