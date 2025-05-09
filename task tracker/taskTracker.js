const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("add-task-btn")
const tasksContainer = document.getElementById("tasks-container")
const editForm = document.getElementById("edit-form")
const editInput = document.getElementById("edit-input")
const updateBtn = document.getElementById("update-btn")

let tasksArr = [
    {
        id: 0,
        title: "go to gym",
        status: "incomplete"
    },
    {
        id: 1,
        title: "Build stuff",
        status: "incomplete"
    },
    {
        id: 2,
        title: "F*&% that yaebe",
        status: "incomplete"
    }
]

const completedTasks = []

/* 
@func: createTask()
@para: none
@comm: 
*/
function createTask(){
    if(taskInput.value === "" || taskInput.value === " "){
        alert("A task cannot be blank. Please enter a task into the input field.")
        return
    }

    let newTask = {
        id: Number(`${tasksArr.length}-${Date.now}`),
        title: taskInput.value,
        status: "incomplete"
    }

    tasksArr.push(newTask)
    renderTasks()
    taskInput.value = ""
}

/*  
@func: renderTasks()
@para: none
@comm: 
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
                        <button type="button" class="btn edit-btn" onclick="editTask(${task.id})">Edit</button>
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
                        <button type="button" class="edit-btn" onclick="editTask(${task.id})" disabled >Edit</button>
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
@func: editTask()
@para: id
@comm: this function is responsible for changing the value of a task title when the edit button is clicked.
*/
function editTask(id){
    editForm.showModal()
    let taskToEdit = tasksArr.find(item => item.id === id)
    
    updateBtn.addEventListener("click", () => {
        taskToEdit.title = editInput.value
        editForm.close()
        renderTasks()
    })
}

/*
@func: deleteTask()
@para: id
@comm: this function deletes a given task from the DOM and task array. A delete is accomplished by removing an element from the tasks array then re-rendering all remaining elements.
*/
function deleteTask(id){
   tasksArr = tasksArr.filter(item => item.id !== id)
   renderTasks()
}


/* 
@func: completeTask()
@para: id
@comm: this function is responsible for 'completing' a task. When the checkbox is checked, the task's status is changed; the task is filtered out of then appended to the tasks array. The reordered array is then rendered to the DOM. Styling changes to any completed task(s) are applied during render.
*/
function taskComplete(id){
    const completedTask = tasksArr.find(item => item.id === id)
    completedTask.status = "completed"
    tasksArr = tasksArr.filter(item => item.id !== id)
    console.log("completedTask: ", completedTask, "\n",
        "tasks array: ", tasksArr)
    tasksArr.push(completedTask)
    console.log("tasksArr: ", tasksArr)
    renderTasks()
}

/* 
@func: uncheckTask()
@para: id
@comm:
*/
function uncheckTask(id){

}

renderTasks()