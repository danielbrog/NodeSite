const taskForm = document.querySelector('form')
const authToken = window.sessionStorage.getItem('AuthToken')
const newDesc = document.querySelector('#description')

function populateTasks(){
fetch('/tasks', {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }
}).then((response) => {
    response.json().then((data) => {

        const tasks = document.createElement('div')
        tasks.id = 'tasks'
        data.forEach((task)=> {
            tasks.append(makeTaskElement(task))
        })
        document.getElementById('taskWindow').append(tasks)
    })
})
}
function makeTaskElement(task){

    const description = document.createElement('p')
    description.innerText = 'Description: '+ task.description
    description.classList.add('taskInfo')
    const completed = document.createElement('p')
    completed.classList.add('taskInfo')
    completed.innerText = 'Completed: ' + task.completed
    const taskID = document.createElement('p')
    taskID.classList.add('idHide')
    taskID.innerText= task._id

    const taskElement = document.createElement('div')
    taskElement.classList.add('task')
    taskElement.append(description)
    taskElement.append(completed)
    taskElement.append(taskID)

    if(!task.completed){
        const completeButton = document.createElement('button')
        completeButton.onclick = completeTask
        completeButton.innerText = 'Task Completed'
        taskElement.append(completeButton)
    }

    return taskElement
}

function completeTask(){
    this.parentNode.children[1].innerText = 'Completed: true'
    url = '/tasks/'+this.parentNode.children[2].innerText
    console.log(url)
    const updatedTask = {"completed": "true"}
    fetch(url,{
        method: 'PATCH',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(updatedTask)
    }).then((response) => {
        console.log(response)
        response.json().then((data) => {
            console.log(data)
        })
    })
    this.parentNode.removeChild(this)  
}

function removeCompleted(){
    console.log('removing...')
    fetch('/tasks',{
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    document.getElementById('tasks').remove()
    populateTasks()
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newTask = {"description": newDesc.value}
    fetch('/tasks',{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(newTask)
    }).then(() => {
        document.getElementById('newTask').style.display = "none"
        document.getElementById('tasks').remove()
        populateTasks()
    })

})

function newTask(){
    document.getElementById('newTask').style.display = "block"
}

populateTasks()