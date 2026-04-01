// Data Store (Mirrors your struct Student)
let students = [
    { roll: 101, name: "Alice Johnson", marks: 92.50 },
    { roll: 102, name: "Robert Smith", marks: 78.00 },
    { roll: 103, name: "Charlie Brown", marks: 85.25 }
];

document.addEventListener('DOMContentLoaded', () => {
    refreshAll();

    // Handle Add Student
    const addForm = document.getElementById('addStudentForm');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!addForm.checkValidity()) {
            addForm.classList.add('was-validated');
            return;
        }

        const roll = parseInt(document.getElementById('inpRoll').value);
        const name = document.getElementById('inpName').value;
        const marks = parseFloat(document.getElementById('inpMarks').value);

        if (students.some(s => s.roll === roll)) {
            notify("Roll number already exists in system!", "bg-danger");
            return;
        }

        students.push({ roll, name, marks });
        addForm.reset();
        addForm.classList.remove('was-validated');
        notify("✅ Student Added Successfully!", "bg-success");
        refreshAll();
        showSection('view-students', document.querySelector('[onclick*="view-students"]'));
    });

    // Sidebar toggle
    document.getElementById('sidebarCollapse').onclick = () => {
        document.getElementById('sidebar').classList.toggle('active');
    };
});

function showSection(id, element) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    element.classList.add('active');

    document.getElementById('breadcrumb-current').innerText = element.innerText.trim();

    if(window.innerWidth < 992) document.getElementById('sidebar').classList.remove('active');
}

function refreshAll() {
    updateStats();
    renderDashboardTable();
    renderViewTable();
}

function updateStats() {
    const count = students.length;
    const avg = count > 0 ? (students.reduce((a, b) => a + b.marks, 0) / count).toFixed(2) : "0.00";
    const high = count > 0 ? Math.max(...students.map(s => s.marks)).toFixed(2) : "0.00";

    document.getElementById('stat-total').innerText = count;
    document.getElementById('stat-avg').innerText = avg;
    document.getElementById('stat-high').innerText = high;
}

function renderDashboardTable() {
    const tbody = document.getElementById('recent-table-body');
    tbody.innerHTML = '';
    students.slice(-5).reverse().forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">#${s.roll}</td>
                <td>${s.name}</td>
                <td>${s.marks.toFixed(2)}</td>
                <td><span class="badge ${s.marks >= 50 ? 'bg-success' : 'bg-danger'}">Recorded</span></td>
            </tr>
        `;
    });
}

function renderViewTable() {
    const tbody = document.getElementById('view-table-body');
    tbody.innerHTML = '';
    students.forEach(s => {
        tbody.innerHTML += `
            <tr>
                <td class="fw-bold">${s.roll}</td>
                <td>${s.name}</td>
                <td>${s.marks.toFixed(2)}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-light text-danger" onclick="deleteStudent(${s.roll})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

function handleSearch() {
    const roll = parseInt(document.getElementById('searchRoll').value);
    const student = students.find(s => s.roll === roll);
    
    const resultsDiv = document.getElementById('searchResults');
    const notFoundDiv = document.getElementById('searchNotFound');

    if (student) {
        resultsDiv.style.display = 'block';
        notFoundDiv.style.display = 'none';
        document.getElementById('searchCardContent').innerHTML = `
            <div class="row">
                <div class="col-sm-4 text-muted">Roll Number:</div>
                <div class="col-sm-8 fw-bold">${student.roll}</div>
                <div class="col-sm-4 text-muted mt-2">Full Name:</div>
                <div class="col-sm-8 fw-bold mt-2">${student.name}</div>
                <div class="col-sm-4 text-muted mt-2">Marks Scored:</div>
                <div class="col-sm-8 fw-bold mt-2 text-primary">${student.marks.toFixed(2)}</div>
            </div>
        `;
    } else {
        resultsDiv.style.display = 'none';
        notFoundDiv.style.display = 'block';
    }
}

function deleteStudent(roll) {
    if(confirm("Delete this record permanently?")) {
        students = students.filter(s => s.roll !== roll);
        notify("Record removed.", "bg-dark");
        refreshAll();
    }
}

function simulateExit() {
    if(confirm("👋 Are you sure you want to exit the management system?")) {
        document.body.innerHTML = `
            <div class="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
                <div class="text-center">
                    <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
                    <h2 class="fw-bold">Session Ended</h2>
                    <p class="text-muted">Thank you for using the Student Management System.</p>
                    <button class="btn btn-primary" onclick="location.reload()">Restart Application</button>
                </div>
            </div>
        `;
    }
}

function notify(msg, colorClass) {
    const toastEl = document.getElementById('liveToast');
    const toastMsg = document.getElementById('toastMsg');
    toastEl.className = `toast align-items-center text-white border-0 ${colorClass}`;
    toastMsg.innerText = msg;
    new bootstrap.Toast(toastEl).show();
}

function clearAllData() {
    if(confirm("WARNING: This will wipe all current records. Continue?")) {
        students = [];
        refreshAll();
        notify("Database cleared.", "bg-danger");
    }
}

function exportData() {
    notify("Preparing students.txt for download...", "bg-info text-dark");
}