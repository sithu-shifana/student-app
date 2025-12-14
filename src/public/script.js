let editId = null;

async function load() {
  const res = await fetch('/students');
  render(await res.json());
}

async function addStudent() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  const body = JSON.stringify({ name, email });

  let res;
  if (editId) {
    res = await fetch(`/students/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body
    });
  } else {
    res = await fetch('/students', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    });
  }

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return; 
  }

  alert(editId ? "Student updated successfully " : "Student added successfully ");

  editId = null;
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.querySelector("button").innerText = "Add";

  load();
}

async function searchStudent() {
  const q = document.getElementById("search").value;
  const res = await fetch('/students/search?q=' + q);
  render(await res.json());
}

async function deleteStudent(id) {
  const res = await fetch('/students/' + id, { method: "DELETE" });
  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Delete failed");
    return;
  }

  alert("Student deleted successfully 🗑️");
  load();
}

function editStudent(id, name, email) {
  editId = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.querySelector("button").innerText = "Update";
}

function render(list) {
  const tbody = document.querySelector("#table tbody");
  tbody.innerHTML = "";

  list.forEach(s => {
    tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>
          <button onclick="editStudent('${s._id}','${s.name}','${s.email}')">Edit</button>
          <button onclick="deleteStudent('${s._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

load();
