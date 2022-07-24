const dom = {
    add: document.getElementById('add'),
    new: document.getElementById('new'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count')
}
//массив
const tasks = [];

//Добавление задачи
dom.add.onclick = () => {
    const newTaskText = dom.new.value
    if(newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks)
        dom.new.value = ''
        taskRender(tasks)
    }
}

//Функция добавления задачи
function addTask(text,list){
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComplete: false
    }
    list.push(task)
}
//Проверка на одинаковые задачи
function isNotHaveTask(text, list){
    let isNotHave = true

    list.forEach((task) => {
        if(task.text == text){
            alert('Задача уже существует')
            isNotHave = false
        }
    })

    return isNotHave
}

//Функция вывода списка задач
function taskRender(list){
    let htmlList = ''

    list.forEach(task => {
        const cls = task.isComplete ? 'todo-task todo_task_complete' : 
        'todo-task'
        const checked = task.isComplete ? 'checked' : '' 
        const taskHtml = `

             <div id="${task.id}"class="${cls}">
                <label class="todo-checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="todo-checkbox-div"></div>
                </label>
                <div class="todo-task-text">
                    ${task.text}
                </div>
                <div class="todo-task-del">Удалить</div>
            </div>
        `
        htmlList = htmlList + taskHtml
    })
    dom.tasks.innerHTML = htmlList

    renderTasksCount(list)
}
//Следим за чекбоксом
dom.tasks.onclick = (event) => {
    const target = event.target
    const isCheckboxEl = target.classList.contains('todo-checkbox-div')
    const isDeteleEl = target.classList.contains('todo-task-del')
    if(isCheckboxEl){

        const task = target.parentElement.parentElement
        const taskId = task.getAttribute('id')
        changeTaskStatus(taskId,tasks)
        taskRender(tasks)

    }
    if(isDeteleEl){
        const task = target.parentElement
        const taskId = task.getAttribute('id')
        deleteTask(taskId, tasks)
        taskRender(tasks)
    }
}
function changeTaskStatus(id, list){
    list.forEach((task) => {
        if(task.id == id){
            task.isComplete = !task.isComplete
        }
    })
}

//Удаление 
function deleteTask(id, list){
    list.forEach((task, idx) => {
        if(task.id == id) {
            list.splice(idx, 1)
        }
    })
}

//Кол-во задач
function renderTasksCount(list){
    dom.count.innerHTML = list.length
}