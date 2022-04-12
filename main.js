var courseApi = ' http://localhost:3000/courses'

;(function start(){
    getCourses(renderCourses)
    handleCreateForm()
})()

function getCourses(callbackFunction){
    fetch(courseApi)
    .then(response => response.json())
    .then(callbackFunction)
}

function createCourse(data, callbackFunction){
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi, options)
        .then(response => response.json())
        .then(callbackFunction)
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create')
    createBtn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value 
        var description = document.querySelector('input[name="description"]').value 

        var formData = {
            name: name,
            description: description
        }
        createCourse(formData, () => {
            getCourses(renderCourses)
        })
    }
}

function editCourse(id, data, callbackFunction){
    var options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + '/' + id, options)
        .then(response => response.json())
        .then(callbackFunction)
}

function handleEditCourse(id){
    var createBtn = document.querySelector('#create')
    var name = document.querySelector('.course-name-' + id)
    var description = document.querySelector('.course-description-' + id)
    var nameInput = document.querySelector('input[name="name"]')
    var descriptionInput = document.querySelector('input[name="description"]')
    nameInput.value = name.innerHTML
    descriptionInput.value = description.innerText
    createBtn.setAttribute('id', 'update-btn')
    
    if(createBtn.innerText === 'Create'){
        createBtn.innerText = 'Update'
        createBtn.onclick = function(){
            var newInput = document.querySelector('input[name="name"]').value
            var newDescription = document.querySelector('input[name="description"]').value
            var formData = {
                name: newInput,
                description: newDescription
            }
            editCourse(id, formData, function(){
                getCourses(renderCourses)
            })
        }

    }  
}

function handleDeleteCourse(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(courseApi + '/' + id, options)
        .then(response => response.json())
        .then(() => {
            var courseItem = document.querySelector('.course-item-' + id)
            if(courseItem){
                courseItem.remove()
            }
        })
}

function renderCourses(courses) {
    var listCoursesBlock = document.querySelector('#list-courses')

    var htmls = courses.map(course => {
        return `
            <li class="course-item-${course.id}">
                <h4 class="course-name-${course.id}">${course.name}</h4>
                <p class="course-description-${course.id}">${course.description}</p>
                <button onclick="handleDeleteCourse(${course.id})">Delete</button>
                <button onclick="handleEditCourse(${course.id})" class="edit-btn">Edit</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}

