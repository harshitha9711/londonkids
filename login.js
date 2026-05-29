async function login() {

  let email =
    document.getElementById("email").value;

  let password =
    document.getElementById("password").value;

  let res = await fetch(
    "http://localhost:5000/api/login",
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
      "Wrong Login";

  }

}