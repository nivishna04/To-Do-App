let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

displayTasks();

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask(){

    const input =
    document.getElementById("taskInput");

    const text =
    input.value.trim();

    if(text === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();
    input.value="";
    displayTasks();
}

function displayTasks(){

    const list =
    document.getElementById("taskList");

    const search =
    document.getElementById("searchInput")
    .value.toLowerCase();

    list.innerHTML="";

    const filteredTasks =
    tasks.filter(task=>{

        const searchMatch =
        task.text.toLowerCase()
        .includes(search);

        const filterMatch =
        currentFilter==="all" ||
        (currentFilter==="completed" &&
        task.completed) ||
        (currentFilter==="pending" &&
        !task.completed);

        return searchMatch &&
        filterMatch;
    });

    filteredTasks.forEach(task=>{

        const index =
        tasks.indexOf(task);

        const li =
        document.createElement("li");

        li.innerHTML=`
        <span class="${
        task.completed ? "completed" : ""
        }">
        ${task.text}
        </span>

        <div class="actions">

        <button
        class="complete-btn"
        onclick="toggleTask(${index})">
        ✓
        </button>

        <button
        class="edit-btn"
        onclick="editTask(${index})">
        ✏️
        </button>

        <button
        class="delete-btn"
        onclick="deleteTask(${index})">
        🗑️
        </button>

        </div>
        `;

        list.appendChild(li);
    });

    document.getElementById(
    "taskCounter").innerText =
    `Total Tasks: ${tasks.length}`;

    updateProgress();
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index){

    let updated =
    prompt(
    "Edit Task",
    tasks[index].text
    );

    if(updated !== null &&
    updated.trim() !== ""){

        tasks[index].text =
        updated.trim();

        saveTasks();
        displayTasks();
    }
}

function deleteTask(index){

    if(confirm(
    "Delete this task?"
    )){

        tasks.splice(index,1);

        saveTasks();
        displayTasks();
    }
}

function setFilter(filter){

    currentFilter = filter;

    displayTasks();
}

function updateProgress(){

    const total =
    tasks.length;

    const completed =
    tasks.filter(task =>
    task.completed).length;

    const percentage =
    total===0 ? 0 :
    Math.round(
    (completed/total)*100);

    document.getElementById(
    "progressText").innerText =
    `Progress: ${completed}/${total} Tasks Completed (${percentage}%)`;

    document.getElementById(
    "progressFill").style.width =
    percentage + "%";

    if(total>0 &&
    completed===total){

        document.getElementById(
        "successMessage").innerHTML =
        "🎉 All Tasks Completed Successfully! 🎉";

    }else{

        document.getElementById(
        "successMessage").innerHTML =
        "";
    }
}
