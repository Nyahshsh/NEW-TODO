const todoSection = document.getElementById('todo-section');
const authSection = document.getElementById('auth-section');
const signInForm = document.getElementById('sign-in-form');
const registerForm = document.getElementById('register-form');
const signOutBtn = document.getElementById('sign-out-btn');
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');
const goToRegister = document.getElementById('go-to-register');
const goToSignIn = document.getElementById('go-to-signin');

// User authentication
let currentUser = null;

const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));
const setUserInLocalStorage = (user) => localStorage.setItem('user', JSON.stringify(user));

// Event listeners for sign-in and register
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
    
    const savedUser = getUserFromLocalStorage();
    if (savedUser && savedUser.username === username && savedUser.password === password) {
        currentUser = savedUser;
        toggleAuthSection(false);
        loadTasks();
    } else {
        alert('Invalid credentials');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    
    const user = { username, password };
    setUserInLocalStorage(user);
    currentUser = user;
    toggleAuthSection(false);
    loadTasks();
});

// Toggle sections between auth and todo
goToRegister.addEventListener('click', () => {
    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('register').style.display = 'block';
});

goToSignIn.addEventListener('click', () => {
    document.getElementById('register').style.display = 'none';
    document.getElementById('sign-in').style.display = 'block';
});

signOutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    currentUser = null;
    toggleAuthSection(true);
});

const toggleAuthSection = (showAuth) => {
    authSection.style.display = showAuth ? 'block' : 'none';
    todoSection.style.display = showAuth ? 'none' : 'block';
};

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    todoList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask('${task}')">Delete</button>`;
        todoList.appendChild(li);
    });
};

addTaskBtn.addEventListener('click', () => {
    const task = todoInput.value;
    if (task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        todoInput.value = '';
        loadTasks();
    }
});

const deleteTask = (task) => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
};

// Check if a user is already signed in
if (getUserFromLocalStorage()) {
    currentUser = getUserFromLocalStorage();
    toggleAuthSection(false);
    loadTasks();
} else {
    toggleAuthSection(true);
}
