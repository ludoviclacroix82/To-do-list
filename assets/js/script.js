
const divAdd = document.querySelector('.add');
const btnAdd = divAdd.querySelector('#btnSubmit');
const listTasks = document.querySelector('.list');
const ulListTasks = listTasks.querySelector('ul');

let tasksArray = [];
let tempFinishTaksArray =[];

btnAdd.addEventListener('click', event =>{
   event.preventDefault();
   addTask(event.target.parentNode);

   console.log('add task');
})

function addTask(event){
    const task = event.querySelector('#task').value;
    tempTaksArray = Array.from(getItem('Tasks'));        
    tempTaksArray.push(task);

    event.querySelector('#task').value = "";

    setItem('Tasks',tempTaksArray ); 
    listingTasks();
}

function listingTasks(){
    
    linstingTasksRefresh();

    tempTaksArray = Array.from(getItem('Tasks'));
    let cpt = 0;

    for (const task of tempTaksArray) {
        const elemLi = document.createElement('li');
        const elemCheckBox = '<input type="checkbox" name="" id="'+cpt+'">';
        const elemBtn = '<button id='+cpt+'>X</button>';
        ulListTasks.appendChild(elemLi);

        elemLi.innerHTML = elemCheckBox +" " + task +" "+ elemBtn;


        /**
         * ajout une eventlistener sur chaque button des taks 
         * et lanche la fucntion removetask avec id du button
         */
        
        cpt ++;
    }

    const btnDelete = listTasks.querySelectorAll('button');
    for (const btn of btnDelete) {
        btn.addEventListener('click',event =>{
            removeTask(event.target.id);
        });
    }
    const btnfinsih = listTasks.querySelectorAll('input[type=checkbox]');
    for (const btn of btnfinsih) {
        btn.addEventListener('change',event =>{
            finishTtask(event.target.id);
        });
    }
    //console.log(tempTaksArray);
}
function finishTtask(id){  
    tempFinishTaksArray.push(id);
    setItem('Finish',tempFinishTaksArray); 
    
    console.log(getItem('Finish',tempFinishTaksArray));
}
/**
 * Supprimer la Task dans le localStorage
 * liste le localStorage et delete la task en fonction du id
 * @param {*} id du task a delete
 */
function removeTask(id){
    TaksArray = Array.from(getItem('Tasks')); 
    tempTaksArray = [];   

    for (let i = 0; i < TaksArray.length; i++) {
        console.log(i);
        if(i != parseInt(id))
            tempTaksArray.push(TaksArray[i]);        
    }

    setItem('Tasks',tempTaksArray );     
    listingTasks();
}
function linstingTasksRefresh(){
    
    const liTasks = ulListTasks.querySelectorAll('li');
    const titleTasks = divAdd.querySelector('#title');
    const task = divAdd.querySelector('#task');  

    for (const li of liTasks) {
        ulListTasks.removeChild(li);
    }
}
/**
 * Ajout dans le localStorage
 * @param {*} name nom de ta task
 * @param {*} value detail de la task
 */
function setItem(name,value){
    //console.log('ajout task');    
    return localStorage.setItem(name,JSON.stringify(value));
}
/**
 * recupere l'info dans le LocalStorage
 * @param {*} title 
 */
function getItem(title){
    return  JSON.parse(localStorage.getItem(title));
}

listingTasks();