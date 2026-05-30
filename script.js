// POPUP

setTimeout(() => {

let popup = document.getElementById("popup");

if(popup){

popup.classList.remove("hide");

}

},3000);



function closePopup(){

document
.getElementById("popup")
.classList
.add("hide");

}



// COUNTER

document
.querySelectorAll(".count")
.forEach(counter=>{

let target=

Number(
counter.dataset.target
);

let count=0;

function update(){

if(count<=target){

counter.innerText=count;

count+=Math.ceil(target/100);

setTimeout(update,20);

}

}

update();

});



// google sheet FORM

document
.getElementById(
"admissionForm"
)

.addEventListener(

"submit",

async function(e){

e.preventDefault();

let data={

parent:
document.getElementById("parent").value,

student:
document.getElementById("student").value,

class:
document.getElementById("class").value,

phone:
document.getElementById("phone").value,

message:
document.getElementById("message").value

};


let btn =
document.querySelector(
'button[type="submit"]'
);

btn.disabled=true;

btn.innerHTML=
"⏳ Submitting...";

showThank();

document
.getElementById("admissionForm")
.reset();

try {

  let res = await fetch(
    "https://londonkids-backend.onrender.com/api/admission",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  let result = await res.json();

  if(result.success){

    showThank();

    document
    .getElementById("admissionForm")
    .reset();

  }else{

    alert("Submission Failed");

  }

}catch(err){

  console.error(err);

  alert("Server Error");

}



setTimeout(()=>{

closeThank();

btn.disabled=false;

btn.innerHTML=
"Submit";

},3000);


document
.getElementById(
"admissionForm"
)
.reset();

showThank();

setTimeout(()=>{

closeThank();

},3000);

}

);
function showThank(){

document
.getElementById(
"thankyou"
)
.classList
.add(
"show"
);

}

function closeThank(){

document
.getElementById(
"thankyou"
)
.classList
.remove(
"show"
);

}
let gallery=

document
.getElementById(
"gallery"
);

if(gallery){

let images = [
  "images/school1.jpeg",
  "images/school2.jpeg",
  "images/school3.jpeg",
  "images/school4.jpeg"
];

JSON.parse(

localStorage
.getItem(
"gallery"
)

|| "[]"

);

gallery.innerHTML="";

images.forEach(src=>{
    
gallery.innerHTML+=`

<div class="gallery-card">

<img
src="${src}"
onclick="openImage('${src}')"
>



</div>

`;

});

}
function openImage(src){

let popup=

document
.getElementById(
"imagePopup"
);

let img=

document
.getElementById(
"popupImg"
);

popup.style.display=
"flex";

img.src=
src;

}

function closeImage(){

document
.getElementById(
"imagePopup"
)
.style.display=
"none";

}
function deleteGallery(){

let ok=

confirm(
"Delete all gallery images?"
);

if(ok){

localStorage
.removeItem(
"gallery"
);

alert(
"Gallery cleared"
);

location.reload();

}

}
