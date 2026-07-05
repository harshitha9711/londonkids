async function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

console.log(email,password);

const res=await fetch(
"https://londonkids-backend.onrender.com/api/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

console.log("Status:",res.status);

const data=await res.json();

console.log(data);

}