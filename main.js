// 값 입력
// + 누르면 할일추가
// delete는 할일 삭제
// check는 할일 끝
// 탭을 누르면 언더바 이동
// 끝남 탭은 끝난 아이탬만 , 진행중은 진행중만
// 전체탭을 누르면 전채 아이탬으로 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
let tabs = document.querySelectorAll(".task-tabs div")
let mode = 'all'
let filterList = []
let list = []
let underLine = document.getElementById("under-line")
let allD = document.getElementById("allD")



allD.addEventListener("click",AD)
taskInput,addEventListener("keypress",function(event){
    if(taskInput.value){
        if(event.key === 'Enter'){
            event.preventDefault()
            document.getElementById("task-input").click()
            addTask()
        }
    }
})
addButton.addEventListener("click",addTask)

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
   }  

function addTask(){
    if(taskInput.value == ''){
        addButton.disable = true
    } else {
        addButton.disable = false
        let task = {
            id:randomIDGenerate(),
            taskContent: taskInput.value,
            isComplete:false
        }
        taskList.push(task)
        console.log(taskList)
        mode = 'all'
        render()
        taskInput.value = ''
    }
}

function render(){
    list = []
    if(mode == "all"){
        list = taskList
    } else if(mode =="ongoing" || mode == "done"){
        list = filterList
    } 
    let resultHTML = ''
    for(let i = 0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class="task color bor">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="CK button">◆</button>
                        <button onclick="deleteTask('${list[i].id}')" class="DL button">■</button>
                    </div>
                </div>`
        } else{
        resultHTML += `<div class="task bor">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')" class="CKD button">◇</button>
                        <button onclick="deleteTask('${list[i].id}')" class="DL button">■</button>
                    </div>
                </div>`
                }
    }

    
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break
        }
    }
    render()
    console.log(taskList)
    filter()
}
function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
    
}
function deleteTask(id){
    for(let i = 0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break
        }
    }
    filter()
}

function filter(event){
    filterList =[]
    if(event){
        mode = event.target.id
    }
    if(mode == "all"){
        render()
        underLine.style.left = 0
        underLine.style.width = 64 + "px"
    } else if(mode == "ongoing"){
        for(let i =0; i <taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
        underLine.style.left = 4 + "em"
        underLine.style.width = 80 + "px"
    } else if(mode == "done"){
        for(let i =0; i <taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
        underLine.style.left = 9 + "em"
        underLine.style.width = 64 + "px"
    }
}
function AD(){
    taskList = []
    render()
}