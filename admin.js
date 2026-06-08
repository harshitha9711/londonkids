
if(

localStorage
.getItem(
"admin"
)

!==

"true"

){

window.location.href=

"admin-login.html";

}

async function addImage(){

const file =
document
.getElementById("galleryUpload")
.files[0];

if(!file){

alert("Select image");
return;

}

const formData =
new FormData();

formData.append(
"image",
file
);

try{

const res =
await fetch(
"https://londonkids-backend.onrender.com/api/gallery",
{
method:"POST",
body:formData
}
);

const data =
await res.json();

if(data.success){

alert("Image Uploaded");

loadGallery();

}else{

alert("Upload Failed");

}

}catch(err){

console.error(err);

alert("Server Error");

}

}

async function loadGallery(){

const res =
await fetch(
"https://londonkids-backend.onrender.com/api/gallery"
);

const images =
await res.json();

const box =
document.getElementById(
"adminGallery"
);

if(!box) return;

box.innerHTML="";

images.forEach(img=>{

box.innerHTML += `

<div class="admin-card">

<img src="${img.image_url}">

<button
onclick="deleteOne(${img.id})">
❌
</button>

</div>

`;

});

document.getElementById(
"totalImages"
).innerText =
images.length;

}

async function deleteOne(id){

const ok =
confirm(
"Delete image?"
);

if(!ok) return;

const res = await fetch(
`https://londonkids-backend.onrender.com/api/gallery/${id}`,
{
method:"DELETE"
}
);

const data = await res.json();

if(data.success){
  loadGallery();
}

}

loadGallery();
function logout(){

localStorage.removeItem(
"admin"
);

window.location.href=

"login.html";

}

async function loadAdmissions() {

  let res = await fetch(
    "https://londonkids-backend.onrender.com/api/admissions"
  );

  let data = await res.json();

  let search = document
    .getElementById("searchAdmission")
    ?.value
    .toLowerCase() || "";

  data = data.filter(row =>
    row.student_name.toLowerCase().includes(search) ||
    row.parent_name.toLowerCase().includes(search) ||
    row.phone.toLowerCase().includes(search)
  );

  let tbody = document.querySelector(
    "#admissionsTable tbody"
  );

  if (!tbody) return;

  tbody.innerHTML = "";

  data.forEach(row => {

    tbody.innerHTML += `
      <tr>
        <td>${row.id}</td>
        <td>${row.parent_name}</td>
        <td>${row.student_name}</td>
        <td>${row.age}</td>
        <td>${row.class_name}</td>
        <td>${row.phone}</td>
        <td>
          <button onclick="deleteAdmission(${row.id})">
            Delete
          </button>
        </td>
      </tr>
    `;

  });

  let totalAdmissions =
    document.getElementById("totalAdmissions");

  if (totalAdmissions) {
    totalAdmissions.innerText = data.length;
  }

}



async function deleteAdmission(id) {

  let ok = confirm(
    "Delete this admission?"
  );

  if (!ok) return;

await fetch(
`https://londonkids-backend.onrender.com/api/admissions/${id}`,
{
method:"DELETE"
}
);

  loadAdmissions();

}

loadAdmissions();
loadGallery();