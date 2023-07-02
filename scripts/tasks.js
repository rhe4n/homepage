var tasks = new Map();

function loadTasks() {
    readTasks();
    showTasks();
}

function readTasks() {
    console.log("reading tasks...");
    //readTextFile("resources/files/tasks.json", this.toMap, callback);
    readFromLocalStorage();
}

function readFromLocalStorage() {
    console.log(localStorage);
    loadMapFromLocal();
}

function loadMapFromLocal() {
    var retrieved = localStorage.getItem("tasks");
    tasks = new Map(JSON.parse(retrieved));
    console.log(tasks);
}

function showTasks() {
    console.log("showing tasks...");
    tasks.forEach(
        (value, key) => {{
            var element = document.createElement("div");
            element.setAttribute("id", key);
            element.setAttribute("class", "taskHoverable");
            element.setAttribute("onclick", "removeHTMLElement(this)");
            element.innerText = value;
            $("#taskPanel").append(element);
        }}
    );
}

function toMap(text) {
    console.log("saving to map: " + text);
    var arr = JSON.parse(text).tasks;
    for (var i = 0; i < arr.length; i++) {
        tasks.set(arr[i].id, arr[i].content);
    }
    console.log(tasks);
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

function addTask() {
    var key = uuidv4();
    var value = $("#taskInput").val();
    var element = document.createElement("div");
    $("#taskInput").val("");

    element.setAttribute("id", key);
    element.setAttribute("class", "taskHoverable");
    element.setAttribute("onclick", "removeHTMLElement(this)");
    element.innerText = value;
    $("#taskPanel").append(element);

    tasks.set(key, value);

    saveTasks();
}

function removeHTMLElement(element) {
    tasks.delete(element.getAttribute("id"));
    console.log("removed " + element.getAttribute("id"));
    element.remove();
    console.log(tasks);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(Array.from(tasks.entries())));
}

window.addEventListener("onload", loadTasks());

var input = document.getElementById("taskInput");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
    //document.getElementById("enter").click();
  }
}); 