async function login() {

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

  let data = await res.json();

  if (data.success) {

    localStorage.setItem(
      "admin",
      "true"
    );

    window.location.href =
      "admin.html";

  } else {

    document.getElementById("error")
      .innerHTML =
      " Login Failed";

  }

}