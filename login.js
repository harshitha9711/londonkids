async function login() {
 console.log("Login clicked");
 try{
  let email =
    document.getElementById("email").value;

  let password =
    document.getElementById("password").value;

  let res = await fetch(
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
console.log("Response received");
  let data = await res.json();
console.log(data);
  if (data.success) {

    localStorage.setItem(
"adminToken",
data.token
);

    window.location.href =
      "admin.html";

  } else {

    document.getElementById("error")
      .innerHTML =
      " Login Failed";

  }

}catch(err){
  console.error(err);
  alert(err.message);
}
}