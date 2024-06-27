const taskContainer = document.getElementById('task-container');
const taskForm = document.getElementById('taskForm');
let taskId = 0;

// Função para adicionar uma nova tarefa
const addTask = (task) => {
    const li = document.createElement('div');
    li.innerHTML = `
        <div class="task" id="${taskId}">
            <img class="task-icon" src="images/tarefas diarias.webp" alt="icon-tarefas" draggable="false"> 
            <div class="task-description">
                <p>${task.title}</p>
                <hr>
                <p>${task.description}</p>
            </div>
            <div class="rewards-container" onclick="collect(this)">
                <img class="rewards" src="images/freemogens.png" alt="reward" draggable="false">
                <div>10</div>
            </div>
        </div>
    `;
    taskContainer.appendChild(li);
    taskId += 1;
};

// Função para salvar tarefas no localStorage
const saveTasks = () => {
    const tasks = [];
    const taskElements = document.querySelectorAll('.task');
    taskElements.forEach(taskElement => {
        const title = taskElement.querySelector('.task p:first-child').textContent;
        const description = taskElement.querySelector('.task p:nth-child(3)').textContent;
        tasks.push({ title, description });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Função para carregar tarefas do localStorage
const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => addTask(task));
    }
};

// Carregar tarefas quando a página for carregada
document.addEventListener('DOMContentLoaded', loadTasks);

// Adicionar evento ao formulário para criar uma nova tarefa
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const task = { title, description };

    addTask(task);
    saveTasks();
    taskForm.reset();
});

function collect(elemento) {
    const id = elemento.parentElement.id;
    const storedTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(storedTasks);
    tasks.splice(id, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    elemento.parentElement.style.cssText ='transform: translateX(110%);' +
    'transition-duration: 1s';
    setTimeout(() => {
        elemento.parentElement.remove();
    }, 900);

}

// Salvar tarefas no localStorage quando a página for descarregada
// window.addEventListener('beforeunload', saveTasks);
