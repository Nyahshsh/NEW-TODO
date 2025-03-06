// Mock Data for Schedule and Assignments
const schedule = [
    { day: "Monday", subject: "Math", time: "9:00 AM" },
    { day: "Tuesday", subject: "Science", time: "10:00 AM" },
    { day: "Wednesday", subject: "History", time: "1:00 PM" },
    { day: "Thursday", subject: "English", time: "2:00 PM" },
    { day: "Friday", subject: "Art", time: "11:00 AM" }
];

const assignments = [
    { subject: "Math", task: "Complete Chapter 5 Exercises", dueDate: "2025-03-06" },
    { subject: "Science", task: "Prepare for Quiz on Ecosystems", dueDate: "2025-03-07" }
];

// Pet Health Variables
let petHealth = 100;
const petHealthIncrement = 10;

// Function to display class schedule
function displaySchedule() {
    const scheduleList = document.getElementById("schedule-list");
    scheduleList.innerHTML = "";
    schedule.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.day} - ${item.subject} at ${item.time}`;
        scheduleList.appendChild(listItem);
    });
}

// Function to display assignments
function displayAssignments() {
    const assignmentsList = document.getElementById("assignments-list");
    assignmentsList.innerHTML = "";
    assignments.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.subject}: ${item.task} (Due: ${item.dueDate})`;
        assignmentsList.appendChild(listItem);
    });
}

// Function to add a new assignment
document.getElementById("add-assignment-btn").addEventListener("click", function() {
    const newAssignment = {
        subject: prompt("Enter subject:"),
        task: prompt("Enter task:"),
        dueDate: prompt("Enter due date (YYYY-MM-DD):")
    };
    assignments.push(newAssignment);
    displayAssignments();
    updatePetHealth();
});

// Function to update pet health when an assignment is completed
function updatePetHealth() {
    petHealth = Math.min(petHealth + petHealthIncrement, 100);
    document.getElementById("pet-health").textContent = `Health: ${petHealth}%`;
    updatePetStatus();
}

// Function to update pet status and image
function updatePetStatus() {
    const petStatus = document.getElementById("pet-status");
    const petImage = document.getElementById("pet-image");

    if (petHealth <= 20) {
        petStatus.textContent = "Your pet is weak...";
        petImage.src = "images/pet_sick.png";
    } else if (petHealth <= 50) {
        petStatus.textContent = "Your pet is a bit tired...";
        petImage.src = "images/pet_tired.png";
    } else {
        petStatus.textContent = "Your pet is happy and healthy!";
        petImage.src = "images/pet_healthy.png";
    }
}

// Function to generate a simple calendar (not dynamic, for the sake of simplicity)
function generateCalendar() {
    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.innerHTML = "<p>March 2025</p><div class='calendar-grid'>March Calendar Coming Soon!</div>";
}

// Initialize the app on load
document.addEventListener("DOMContentLoaded", function() {
    displaySchedule();
    displayAssignments();
    generateCalendar();
    updatePetHealth();
});
