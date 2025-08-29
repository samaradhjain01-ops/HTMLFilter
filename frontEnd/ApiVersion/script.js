const API_URL = "http://localhost:8080/filter";

function renderTable(data) {
  const tbody = document.querySelector("#employeeTable tbody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5" style="text-align:center;">No results found</td>`;
    tbody.appendChild(row);
    return;
  }

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

// async function fetchEmployees(filters = {}) {
//   const params = new URLSearchParams(filters).toString();
//   const response = await fetch(`${API_URL}?${params}`);
//   return await response.json();
// }

async function fetchEmployees(filters = {}) {
  showLoader();
  const delay = new Promise(resolve => setTimeout(resolve, 500)); // Ensures at least 2s loader

  try {
    const params = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}?${params}`);
    const data = await response.json();

    await delay; // Waits if fetch is too fast
    return data;
  } finally {
    hideLoader();
  }
}

async function buildFilters() {
  // Fetch all employees (no filters)
  const data = await fetchEmployees();

  const deptSelect = document.getElementById("filterDept");
  const citySelect = document.getElementById("filterCity");

  // Populate department dropdown
  [...new Set(data.map(e => e.department))].forEach(d => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    deptSelect.appendChild(opt);
  });

  // Populate city dropdown
  [...new Set(data.map(e => e.city))].forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    citySelect.appendChild(opt);
  });

  renderTable(data);
}

async function applyFilters() {
  const nameVal = document.getElementById("filterName").value.trim();
  const deptVal = document.getElementById("filterDept").value;
  const ageVal = document.getElementById("filterAge").value;
  const emailVal = document.getElementById("filterEmail").value.trim(); // optional, not supported in backend yet
  const cityVal = document.getElementById("filterCity").value;

  let filters = {};

  if (nameVal) filters.name = nameVal;
  if (deptVal) filters.department = deptVal;
  if (cityVal) filters.city = cityVal;

  // Handle age ranges from dropdown
  if (ageVal === "toddler") {
    filters.minAge = 1;
    filters.maxAge = 3;
  } else if (ageVal === "minor") {
    filters.minAge = 4;
    filters.maxAge = 18;
  } else if (ageVal === "young") {
    filters.minAge = 19;
    filters.maxAge = 50;
  } else if (ageVal === "senior") {
    filters.minAge = 51;
  }

  const data = await fetchEmployees(filters);
  renderTable(data);
}

function showLoader() {
  document.querySelector("#employeeTable tbody").classList.add("blur");
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.querySelector("#employeeTable tbody").classList.remove("blur");

  document.getElementById("loader").style.display = "none";
}


// Initialize
buildFilters();

// Attach listeners
document.querySelectorAll("th input, th select").forEach(el => {
  el.addEventListener("input", applyFilters);
  el.addEventListener("change", applyFilters);
});
