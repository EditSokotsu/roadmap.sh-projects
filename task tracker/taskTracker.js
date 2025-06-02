const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const tasksContainer = document.getElementById("tasks-container")
const editForm = document.getElementById("edit-form")
const editInput = document.getElementById("edit-input")
const updateBtn = document.getElementById("update-btn")

let tasksArr = JSON.parse(localStorage.getItem("taskData")) || []

const completedTasks = []

/* 
@func: createTask()
@para: none
@comm: this function creates a new task.
*/
function createTask(){
    if(taskInput.value === "" || taskInput.value === " "){
        alert("A task cannot be blank. Please enter a task into the input field.")
        return
    }

    let newTask = {
        id: Math.floor((Math.random() * (taskComplete.length+1)) * 99),
        title: taskInput.value,
        status: "incomplete"
    }

    tasksArr.push(newTask)
    renderTasks()
    taskInput.value = ""
    localStorage.setItem("taskData", JSON.stringify(tasksArr))
}

/*  
@func: renderTasks()
@para: none
@comm: this function is responsible for updating the DOM with the task stored in the task array. It handles both complete and incomplete tasks.
*/
function renderTasks(){
    tasksContainer.innerHTML = ""

    if(tasksArr.length){
        tasksArr.forEach((task) => {
            if(task.status === "incomplete"){
                tasksContainer.innerHTML += `
                <div class="task"> 
                    <input type="checkbox" class="task-checkbox" onclick="taskComplete(${task.id})">
                    <span>${task.title}</span>
                    <span class="task-controls">
                        <button type="button" class="btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </span>
                </div>
            `
            }
            else if(task.status === "complete"){
                tasksContainer.innerHTML += `
                <div class="task"> 
                    <input type="checkbox" class="task-checkbox" onclick="uncheckTask(${task.id})" checked>
                    <span class="task-complete">${task.title}</span>
                    <span class="task-controls">
                        <button type="button" class="btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </span>
                </div>
            `
            }
        })
    }
    else{
        return tasksContainer.innerHTML = ""
    }
}

/*
@func: deleteTask()
@para: id
@comm: this function deletes a given task from the DOM and task array. A delete is accomplished by removing an element from the tasks array then re-rendering all remaining elements.
*/
function deleteTask(id){
   tasksArr = tasksArr.filter(item => item.id !== id)
   renderTasks()
   localStorage.setItem("taskData", JSON.stringify(tasksArr))
}


/* 
@func: completeTask()
@para: id
@comm: this function is responsible for 'completing' a task. When the checkbox is checked, the task's status is changed; the task is filtered out of then appended to the tasks array. The reordered array is then rendered to the DOM. Styling changes to any completed task(s) are applied during render.
*/
function taskComplete(id){
    const completedTask = tasksArr.find(item => item.id === id)
    completedTask.status = "complete"
    tasksArr = tasksArr.filter(item => item.id !== id)
    tasksArr.push(completedTask)
    localStorage.setItem("taskData", JSON.stringify(tasksArr))
    renderTasks()
}

/* 
@func: uncheckTask()
@para: id
@comm: 
*/
function uncheckTask(id){
    const taskUncheck = tasksArr.find(item => item.id === id)
    tasksArr = tasksArr.filter(item => item.id !== id)
    taskUncheck.status = "incomplete"
    tasksArr.unshift(taskUncheck)
    localStorage.setItem("taskData", JSON.stringify(tasksArr))
    renderTasks()
}

taskInput.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        createTask()
    }
})

editInput.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        createTask()
    }
})

renderTasks()
/* 
had a look at some of y'alls projects and saw y'all didn't implement an edit, so I didn't either....Plus, I couldn't do it, XD!
*/