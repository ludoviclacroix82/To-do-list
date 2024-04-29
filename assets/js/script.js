
const divAdd = document.querySelector('.add');
const btnAdd = divAdd.querySelector('#btnSubmit');
const listTasks = document.querySelector('.list');
const ulListTasks = listTasks.querySelector('ul');

btnAdd.addEventListener('click', event =>{
   event.preventDefault();
   addTask(event.target.parentNode);

   console.log('add task');
})

function addTask(event){

    const titleTasks = event.querySelector('#title').value;
    const task = event.querySelector('#tak').value;  

    //console.log(titleTasks);
    //console.log(task);

   setItem(titleTasks,task);
   listingTasksRefresh();

  titleTasks.value =" ";
  task.value=" ";  
}

function listingTasks(){

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        const elemLi = document.createElement('li');
        const elemBtn = '<button id='+i+'>X</button>';
        ulListTasks.appendChild(elemLi);

        elemLi.id=key;
        elemLi.innerHTML = key + ": " + value +""+elemBtn;
      
    }

    //console.log("Clé : " + key + ", Valeur : " + value);
    const btnDelete = listTasks.querySelectorAll('button');

    for (const btn of btnDelete) {
        btn.addEventListener('click',event =>{
            console.log(event.target.id);
            removetask(event.target.id);
        });
    }
}

function listingTasksRefresh(){

    const liTasks = ulListTasks.querySelectorAll('li');
    
    for (const li of liTasks) {
        ulListTasks.removeChild(li);
    }

    listingTasks();
}

function removetask(id){
    //console.log(id);
    for (let i = 0; i < localStorage.length; i++) {
        if(i === parseInt(id)){
          let key = localStorage.key(i);
            localStorage.removeItem(key)  
        }        
    } 
    listingTasksRefresh();  
}

function setItem(name,value){

    localStorage.setItem(name,value);
}

function getItem(title){
    localStorage.getItem(title);
}

listingTasks();