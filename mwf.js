document.addEventListener('DOMContentLoaded', async function() {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData.isLoggedIn || !userData.userId) {
        window.location.href = 'signup.html';
        return;
    }

    // Update welcome message
    document.getElementById('username').textContent = `Welcome, ${userData.name}!`;

    // Get DOM elements
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Load initial tasks
    await loadTasks();

    // Add new task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('userData');
        window.location.href = 'signup.html';
    });

    // Handle filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTasks();
        });
    });

    async function loadTasks() {
        try {
            const response = await fetch(`/api/tasks/${userData.userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = await response.json();
            window.tasks = tasks; // Store tasks globally
            renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            try {
                const response = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userData.userId,
                        text: taskText,
                        completed: false
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }

                const newTask = await response.json();
                window.tasks.unshift(newTask);
                renderTasks();
                taskInput.value = '';
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    }

    async function toggleTask(taskId) {
        const task = window.tasks.find(t => t._id === taskId);
        if (task) {
            try {
                const response = await fetch(`/api/tasks/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to update task');
                }

                const updatedTask = await response.json();
                const index = window.tasks.findIndex(t => t._id === taskId);
                window.tasks[index] = updatedTask;
                renderTasks();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    }

    async function deleteTask(taskId) {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete task');
            }

            window.tasks = window.tasks.filter(t => t._id !== taskId);
            renderTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    function renderTasks() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const filteredTasks = window.tasks.filter(task => {
            if (activeFilter === 'active') return !task.completed;
            if (activeFilter === 'completed') return task.completed;
            return true;
        });

        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">Delete</button>
            `;

            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTask(task._id));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task._id));

            taskList.appendChild(li);
        });
    }
});