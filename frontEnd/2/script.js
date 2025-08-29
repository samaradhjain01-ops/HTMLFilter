function renderTable(data) {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  data.forEach(emp => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.age}</td>
      <td>${emp.email}</td>
      <td>${emp.city}</td>
    `;
    tbody.appendChild(row);
  });
}

function buildFilters(data) {
  const deptSelect = document.getElementById("filterDept");
  const citySelect = document.getElementById("filterCity");

  const depts = [...new Set(data.map(e => e.department))];
  const cities = [...new Set(data.map(e => e.city))];

  depts.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    deptSelect.appendChild(opt);
  });

  cities.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    citySelect.appendChild(opt);
  });
}


function applyFilters() {
  const nameVal = document.getElementById("filterName").value.toLowerCase();
  const deptVal = document.getElementById("filterDept").value;
  const ageVal = document.getElementById("filterAge").value;
  const emailVal = document.getElementById("filterEmail").value.toLowerCase();
  const cityVal = document.getElementById("filterCity").value;

  const filtered = employees.filter(e => {
    let ageMatch = true;
    if (ageVal === "toddler") ageMatch = e.age >= 1 && e.age <= 3;
    else if (ageVal === "minor") ageMatch = e.age > 3 && e.age <= 18;
    else if (ageVal === "young") ageMatch = e.age > 18 && e.age <= 50;
    else if (ageVal === "senior") ageMatch = e.age > 50;

    return (
      (nameVal === "" || e.name.toLowerCase().includes(nameVal)) &&
      (deptVal === "" || e.department === deptVal) &&
      ageMatch &&
      (emailVal === "" || e.email.toLowerCase().includes(emailVal)) &&
      (cityVal === "" || e.city === cityVal)
    );
  });

  renderTable(filtered);
}




// function applyFilters() {
//   const nameVal = document.getElementById("filterName").value.toLowerCase();
//   const deptVal = document.getElementById("filterDept").value;
//   const ageVal = document.getElementById("filterAge").value;
//   const emailVal = document.getElementById("filterEmail").value.toLowerCase();
//   const cityVal = document.getElementById("filterCity").value;

//   const filtered = employees.filter(e => {
//     return (
//       (nameVal === "" || e.name.toLowerCase().includes(nameVal)) &&
//       (deptVal === "" || e.department === deptVal) &&
//       (ageVal === "" || e.age == ageVal) &&
//       (emailVal === "" || e.email.toLowerCase().includes(emailVal)) &&
//       (cityVal === "" || e.city === cityVal)
//     );
//   });

//   renderTable(filtered);
// }

// Initialize
renderTable(employees);
buildFilters(employees);

// Attach listeners
document.querySelectorAll("th input, th select").forEach(el => {
  el.addEventListener("input", applyFilters);
  el.addEventListener("change", applyFilters);
});
