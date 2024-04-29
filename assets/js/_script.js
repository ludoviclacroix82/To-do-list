
const divAdd = document.querySelector('.add');
const btnAdd = divAdd.querySelector('#btnSubmit');
const listTasks = document.querySelector('.list');
const ulListTasks = listTasks.querySelector('ul');

const tasksArray = [];

btnAdd.addEventListener('click', event =>{
   event.preventDefault();
   addTask(event.target.parentNode);

   console.log('add task');
})
/**
 * Ajout un Task dans le localStorage
 * @param {*} event 
 */
function addTask(event){

    const titleTasks = event.querySelector('#title').value;
    const task = event.querySelector('#tak').value;  

    //console.log(titleTasks);
    //console.log(task);
    

   setItem(titleTasks,task);

   listingTasksRefresh();
}

/**
 * Liste les tasks
 */
function listingTasks(){
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        const elemLi = document.createElement('li');
        const elemCheckBox = '<input type="checkbox" name="" id="'+i+'">';
        const elemBtn = '<button id='+i+'>X</button>';
        ulListTasks.appendChild(elemLi);

        elemLi.id=key;
        elemLi.innerHTML = elemCheckBox +" " + key + ": " + value +""+elemBtn;
      
    }

    //console.log("Clé : " + key + ", Valeur : " + value);
    const btnDelete = listTasks.querySelectorAll('button');

    /**
     * ajout une eventlistener sur chaque button des taks 
     * et lanche la fucntion removetask avec id du button
     */
    for (const btn of btnDelete) {
        btn.addEventListener('click',event =>{
            //console.log(event.target.id);
            removetask(event.target.id);
        });
    }
}

/**
 * Refresh la liste des Tasks
 */
function listingTasksRefresh(){

    const liTasks = ulListTasks.querySelectorAll('li');
    const titleTasks = divAdd.querySelector('#title');
    const task = divAdd.querySelector('#task');  
    titleTasks.value="";
    task.value="";
    
    for (const li of liTasks) {
        ulListTasks.removeChild(li);
    }

    listingTasks();
}
/**
 * Supprimer la Task dans le localStorage
 * liste le localStorage et delete la task en fonction du id
 * @param {*} id du task a delete
 */
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

/**
 * Ajout dans le localStorage
 * @param {*} name nom de ta task
 * @param {*} value detail de la task
 */
function setItem(name,value){

    localStorage.setItem(name,value);
}
/**
 * recupere l'info dans le LocalStorage
 * @param {*} title 
 */
function getItem(title){
    localStorage.getItem(title);
}

listingTasks();