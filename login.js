async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(email.trim()==="" || password.trim()===""){

alert("Please enter Email and Password");

return;

}
    const btn = document.querySelector("button");

btn.disabled = true;

btn.innerHTML = "Logging in...";
    console.log(email, password);

    try {

        const res = await fetch(
            "https://londonkids-backend.onrender.com/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        console.log("Status:", res.status);

        const data = await res.json();

        console.log(data);

if (data.success) {

    localStorage.setItem(
        "adminToken",
        data.token
    );

    window.location.href = "admin.html";

} else {

    btn.disabled = false;

    btn.innerHTML = "Login";

    document.getElementById("error").innerHTML =
    "❌ Invalid Email or Password";

}

    } catch(err){

btn.disabled = false;

btn.innerHTML = "Login";

console.error(err);

document.getElementById("error").innerHTML =
"⚠ Unable to connect to the server.";

}

}