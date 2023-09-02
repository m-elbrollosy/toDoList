const input = document.getElementById("text");
const addButton = document.querySelector(".form .btn-add");
const tasksContainer = document.querySelector(".tasks .container");


addButton.addEventListener("click", getTasks);
//click on the tasks (delete task & complete task)
tasksContainer.addEventListener("click", (ev)=>{
//1- delete from page - & delete from local Storage
    if (ev.target.classList.contains("delete")){
    //delete task parent of delete button
    ev.target.parentElement.remove();
    //delete from localStorage by id
    deleteTask(ev.target.parentElement.dataset.id);
    }
//2- toggle .done class & change completed status
    if (ev.target.classList.contains("task")){
        //a-toggle .done class
        ev.target.classList.toggle("done");
        //b-change completed status
        taskCompleted(ev.target.dataset.id);
    }
});


let tasksArr = [];
//4b- add values in local storage TO tasks array (if) local storage not empty.
if (localStorage.getItem("tasks")){
    // console.log(window.localStorage.getItem("tasks"));
    tasksArr = JSON.parse(localStorage.getItem("tasks"));
}
//get data from local storage (why we trigger it?)
//because add elements in add task to array func (working on click event on add button)
//so .. we need elements in page from LS.
getDataFromLS();

function getTasks () {
    let inputVal = input.value.trim();
    
    if(inputVal !== ""){
       // addTasksToArr(arr); to make push & make object
       //2-make this function
       addTasksToArr(inputVal);
       //empty the input value
       input.value = "";
   }

}

function addTasksToArr(tasktext) {
    const tasks = {
        id: Date.now(),
        content: tasktext,
        completed: false
    };
    tasksArr.push(tasks);
         //3a - empty container before adding new task for avoiding duplicate tasks
         //or empty it in function add tasks to page
    tasksContainer.innerHTML = "";
         //3b- add elements to page from array of tasks call func
    addTasksToPg(tasksArr);
    // addTasksToPg(tasks); ??
    //tasks obj is equal to what inside tasksArr
    
        //4a-add tasks to localStorage
    addTaskToLS(tasksArr);
}
//3c- make the function
function addTasksToPg (arr) {
    //loop on tasksArr to make elements
    tasksArr.forEach((task)=>{
        
        let div = document.createElement("div");
        div.classList.add("task");
        //if task is completed add class done
        if (task.completed) {
            div.classList.add("done");
        }
        //
        div.dataset.id = task.id;
        //dom string use append - error if appendChild
        div.append(task.content);

        let span = document.createElement("span");
        span.classList.add("delete");
        span.append("Delete");
        div.appendChild(span);
        tasksContainer.appendChild(div);
    });
}

function addTaskToLS(taskData) {
    window.localStorage.setItem("tasks", JSON.stringify(taskData));
}

function getDataFromLS(){
let data = window.localStorage.getItem("tasks");
if (data) {
    let tasks = JSON.parse(data);
    //add tasks to page
    addTasksToPg(tasks);
    }
}

function deleteTask(taskId) {
//delete element with task id how?
//by remove it from tasks array (By Filter)
tasksArr = tasksArr.filter((ele)=>{
    //not equal is correct (not identical is wrong)
   return ele.id != taskId;
});
/*add task array to local storade not to page
its already in page - so delete it from L S */
// error ? addTasksToPg(tasksArr);
addTaskToLS(tasksArr);
// console.log(tasksArr);
}
 function taskCompleted(dataId){
for (let item of tasksArr){
if (item.id == dataId) {
    item.completed ? item.completed = false : item.completed = true;
    console.log(item);
        }
    }
    addTaskToLS(tasksArr);
 }


//logic
//(on click event) if input not empty
//add task to arr (callback func) & make it 
//( make task content& id) - push it to arr of tasks 
//(here or main => add tasksArr to page container with content & id)  how??
//empty container & loop on tasksArr and make elements 
//then (add tasks to localStorage)