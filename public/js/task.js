const authToken = window.sessionStorage.getItem('AuthToken')

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
        data.forEach((task)=> {
            tasks.append(makeTaskElement(task))
        })
        document.getElementById('tasks').append(tasks)
    })
})

function makeTaskElement(task){
    const description = document.createElement('p')
    description.innerText = 'Description: '+ task.description
    const completed = document.createElement('p')
    completed.innerText = 'Completed: ' + task.completed

    const taskElement = document.createElement('div')
    taskElement.classList.add('task')
    taskElement.append(description)
    taskElement.append(completed)
    return taskElement
}