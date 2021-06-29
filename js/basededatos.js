//conexion a base de datos
const db = firebase.firestore();

//obtengo el formulario web y el contenedor
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-container");

//funcion a la vieja
function saveTask(title, description) {
    db.collection("tareas").doc().set(
        {
            title: title,
            description: description
        }
    )
}

//funcion a la nueva
const getTasks = () => {db.collection("tareas").get();}
const obteniendoTareas = (funcion) => {db.collection("tareas").onSnapshot(funcion);}

//agrego el evento al DOMContentLoaded
window.addEventListener("DOMContentLoaded", async (e) => {
    //codigo de mi funcion del evento DOMContentLoaded
    obteniendoTareas((coleccTareas) => {
        taskContainer.innerHTML = ``;
        coleccTareas.forEach(doc => {
            //codigo de mi funcion que procesará el elemento doc
            taskContainer.innerHTML = taskContainer.innerHTML + `<div class="card card-body mt-2 boder-primary"><h3 class="h5">` + doc.data().title + `</h3><p>` + doc.data().description + `</p>
            <div><button class="btn btn-primary">Edit</button><button class="btn btn-secondary">Delete</button></div></div>`
        });
    });
})

//agrego el evento al submit
taskForm.addEventListener("submit", async (e) => {
    //codigo de mi funcion del evento submit

    //evita refrescar la pagina
    e.preventDefault();

    //obtengo los valores
    const cTitle = taskForm['task-title'].value;
    const cDescription = taskForm['task-description'].value;


    await saveTask(cTitle, cDescription);

    taskForm.reset();
    taskForm['task-title'].focus();
}
)