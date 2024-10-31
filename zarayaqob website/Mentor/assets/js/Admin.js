document.getElementById('myForm').addEventListener('submit', async function(event) {
    
    event.preventDefault();


    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
  if(username == "admin"){
    if(password == "123456789")

        {

            const response = await fetch('/display', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });


            const results = await response.text();
            document.getElementById('result').innerText = results;


        }
        else{
            document.getElementById('result').innerText = "password not matched";
        }
    }
})