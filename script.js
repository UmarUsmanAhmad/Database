const apiUrl = "http://localhost:5120/api/projects";

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded");
    fetchProjects();
    
    document.querySelector("#create-form").addEventListener("submit", createProject);
    
    document.querySelector("#create-btn").addEventListener("click", () => {
        document.querySelector("#overview").classList.add("hidden");
        document.querySelector("#create").classList.remove("hidden");
    });
    
    document.querySelector("#overview-btn").addEventListener("click", () => {
        document.querySelector("#create").classList.add("hidden");
        document.querySelector("#overview").classList.remove("hidden");
    });
});

function fetchProjects() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(projects => displayProjects(projects));
}

function displayProjects(projects) {
    const tableBody = document.querySelector("#project-table tbody");
    tableBody.innerHTML = "";
    projects.forEach(project => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${project.number}</td>
            <td>${project.name}</td>
            <td>${project.startDate} - ${project.endDate}</td>
            <td>${project.status}</td>
            <td><button onclick="deleteProject(${project.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function createProject(event) {
    event.preventDefault();
    
    const project = {
        name: document.querySelector("#name").value,
        startDate: document.querySelector("#start-date").value,
        endDate: document.querySelector("#end-date").value,
        responsible: document.querySelector("#responsible").value,
        customer: document.querySelector("#customer").value,
        service: document.querySelector("#service").value,
        totalPrice: parseFloat(document.querySelector("#total-price").value) || 0,
        status: document.querySelector("#status").value
    };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    }).then(() => {
        fetchProjects();
        event.target.reset();
    });
}

function deleteProject(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => fetchProjects());
}
