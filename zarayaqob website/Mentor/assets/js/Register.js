document.getElementById('myForm').addEventListener('submit', async function(event) {
    
    event.preventDefault();


    const password = document.getElementById('password').value;
    const confirmpassword = document.getElementById('confirmpassword').value;
    if(password === confirmpassword)

        {
            const username = document.getElementById('name').value;
            const firstname = document.getElementById('name').value;
            const lastname = document.getElementById('name').value;
            const email = document.getElementById('name').value;
            const phone = document.getElementById('name').value;
            const password = document.getElementById('password').value;



            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ username, firstname, lastname, email, phone, password })
            });


            const results = await response.text();
            document.getElementById('result').innerText = results;


        }
        else{
            document.getElementById('result').innerText = "password not matched";
        }
})