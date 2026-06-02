
if(

localStorage
.getItem(
"admin"
)

!==

"true"

){

window.location.href=

"login.html";

}
function addImage(){

let file=
document
.getElementById(
"galleryUpload"
)
.files[4];

if(!file){

alert(
"Select image"
);

return;

}

let reader=
new FileReader();

reader.onload=
function(e){

let images=

JSON.parse(

localStorage
.getItem(
"gallery"
)

|| "[]"

);

images.push(
e.target.result
);

localStorage
.setItem(

"gallery",

JSON.stringify(
images
)

);

alert(
"Uploaded"
);
updateDashboardCounts();
loadGallery();

};

reader.readAsDataURL(
file
);

}
function loadGallery(){

let images=

JSON.parse(

localStorage.getItem(
"gallery"
)

|| "[]"

);

let box=

document.getElementById(
"adminGallery"
);

if(!box)return;

box.innerHTML="";

images.forEach(
(src,index)=>{

box.innerHTML+=`

<div class="admin-card">

<img src="${src}">

<button
onclick="deleteOne(${index})"
>

❌

</button>

</div>

`;

});

}

function deleteOne(index){

let ok=
confirm(
"Delete this image?"
);

if(!ok)return;

let images=

JSON.parse(

localStorage.getItem(
"gallery"
)

|| "[]"

);

images.splice(index,1);

localStorage.setItem(

"gallery",

JSON.stringify(
images
)

);

loadGallery();
updateDashboardCounts();

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

function updateDashboardCounts() {

  document.getElementById("totalImages").innerText = 4;

}

async function deleteAdmission(id) {

  let ok = confirm(
    "Delete this admission?"
  );

  if (!ok) return;

  await fetch(
    `http://localhost:5000/api/admissions/${id}`,
    {
      method: "DELETE"
    }
  );

  loadAdmissions();

}

loadAdmissions();
updateDashboardCounts();