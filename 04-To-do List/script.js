document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-items');
    const selectAllBtn = document.getElementById('select-all-btn');

    let tasks = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(input.value);
        input.value = '';
    });

    selectAllBtn.addEventListener('click', toggleSelectAll);

    function addTask(taskText) {
        if (taskText.trim() === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTask(task);
        updateSelectAllButton();
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            <div class="task-content">
                <span class="checkbox"></span>
                <span>${task.text}</span>
            </div>
            <div class="actions">
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        li.classList.add('fade-in');

        if (task.completed) {
            li.classList.add('completed');
        }

        li.querySelector('.checkbox').addEventListener('click', () => toggleTask(task.id));
        li.querySelector('.delete-btn').addEventListener('click', () => removeTask(task.id));

        todoList.appendChild(li);
    }

    function toggleTask(id) {
        const task = tasks.find(t => t.id === id);
        task.completed = !task.completed;
        const li = todoList.querySelector(`[data-id="${id}"]`);
        li.classList.toggle('completed');
        updateSelectAllButton();
    }

    function removeTask(id) {
        const index = tasks.findIndex(t => t.id === id);
        tasks.splice(index, 1);
        const li = todoList.querySelector(`[data-id="${id}"]`);
        li.classList.add('fade-out');
        li.addEventListener('animationend', () => {
            li.remove();
            updateSelectAllButton();
        });
    }

    function toggleSelectAll() {
        const allCompleted = tasks.every(task => task.completed);
        tasks.forEach(task => task.completed = !allCompleted);
        renderAllTasks();
        updateSelectAllButton();
    }

    function renderAllTasks() {
        todoList.innerHTML = '';
        tasks.forEach(renderTask);
    }

    function updateSelectAllButton() {
        const allCompleted = tasks.every(task => task.completed);
        selectAllBtn.textContent = allCompleted ? 'Deselect All' : 'Select All';
    }
});