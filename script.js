document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("create-btn");
    const overviewBtn = document.getElementById("overview-btn");
    const createForm = document.getElementById("create-form");
    const createSection = document.getElementById("create");
    const overviewSection = document.getElementById("overview");
    const projectTableBody = document.querySelector("#project-table tbody");

    if (!createBtn || !createForm || !overviewBtn) {
        console.error("Error: Missing elements in HTML");
        return;
    }

    function clearFormFields() {
        document.getElementById("name").value = "";
        document.getElementById("start-date").value = "";
        document.getElementById("end-date").value = "";
        document.getElementById("responsible").value = "";
        document.getElementById("customer-id").value = "";
        document.getElementById("service").value = "";
        document.getElementById("total-price").value = "";
        document.getElementById("status").value = "Ej påbörjat";
    }

    createBtn.addEventListener("click", function () {
        clearFormFields();
        createSection.classList.remove("hidden");
        overviewSection.classList.add("hidden");
    });

    overviewBtn.addEventListener("click", function () {
        createSection.classList.add("hidden");
        overviewSection.classList.remove("hidden");
        loadProjects();
    });

    createForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const customerId = parseInt(document.getElementById("customer-id").value);
        if (isNaN(customerId) || customerId <= 0) {
            alert("Customer ID must be a valid positive number.");
            return;
        }

        const projectData = {
            name: document.getElementById("name").value,
            startDate: document.getElementById("start-date").value,
            endDate: document.getElementById("end-date").value,
            responsible: document.getElementById("responsible").value,
            customerId: customerId,
            service: document.getElementById("service").value,
            totalPrice: parseFloat(document.getElementById("total-price").value) || 0,
            status: document.getElementById("status").value,
        };

        console.log("Sending Project Data:", projectData);

        try {
            const response = await fetch("http://localhost:5120/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                alert(`Failed to create project! ${errorResponse}`);
                return;
            }

            alert("Project created successfully!");
            loadProjects();
            createSection.classList.add("hidden");
            overviewSection.classList.remove("hidden");
        } catch (error) {
            alert("Error occurred while creating the project.");
        }
    });

    async function loadProjects() {
        try {
            const response = await fetch("http://localhost:5120/api/projects");
            if (!response.ok) throw new Error("Failed to fetch projects");

            let projects = await response.json();
            if (projects.$values) projects = projects.$values;

            if (!Array.isArray(projects)) throw new Error("Invalid response format");

            projectTableBody.innerHTML = "";
            projects.forEach(project => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${project.projectNumber || "N/A"}</td>
                    <td>${project.name}</td>
                    <td>${project.startDate} - ${project.endDate}</td>
                    <td>${project.status}</td>
                    <td><button onclick="editProject(${project.id})">Edit</button></td>
                `;
                projectTableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Failed to load projects", error);
        }
    }

    loadProjects();
});
