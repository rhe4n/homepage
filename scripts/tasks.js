var tasks = null;

function display() {
    this.readTasks();
}

function saveTask(text) {
    tasks = JSON.parse(text);
    showOnScreen()
}

function showOnScreen() {
    tasks.tasks.forEach(element => {
        $("#taskPanel").append("<div class=\"taskHoverable\">" + element.text +"</div>");
    });
    
}

function readTasks() {
    readTextFile("resources/files/tasks.json", this.saveTask);
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            console.log("writing");
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

window.addEventListener("onclick", display());
