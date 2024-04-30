import { setItem, getItem } from './modules/localstorage.js';
import { handleDragStart, handleDragEnd ,handleDragOver ,handleDragEnter ,handleDragLeave, handleDrop } from './modules/dragDrop.js';


const divAdd = document.querySelector('.add');
const btnAdd = divAdd.querySelector('#btnSubmit');
const listTasks = document.querySelector('.list');
const ulListTasks = listTasks.querySelector('ul');

let tempFinishTaksArray;
let tempTaksArray;
let TaksArray;

btnAdd.addEventListener('click', event =>{
   event.preventDefault();
   addTask(event.target.parentNode);

   console.log('add task');
})
/**
 * Liste les Tasks + ajoute un button et un checkbox
 */
function listingTasks(){

    
    linstingTasksRefresh();

    tempTaksArray = Array.from(getItem('Tasks'));
    tempFinishTaksArray = Array.from(getItem('Finish'));
    let cpt = 0;
    //console.log("finish",getItem('Finish'));

    for (const task of tempTaksArray) {
        const elemLi = document.createElement('li');
    
        // Ajout du checkbox
        const elemCheckBox = document.createElement('input');
        elemCheckBox.type = 'checkbox';
        elemCheckBox.id = cpt;
        //ajout du button
        const elemBtn = document.createElement('button');
        elemBtn.id = cpt;
        elemBtn.innerText = 'X';
        // ajout label
        const elemLabel = document.createElement('label');
        elemLabel.innerText = task;
        elemLabel.htmlFor = cpt;
        // positione les element entre eux
        ulListTasks.appendChild(elemLi);
        elemLi.id=cpt;
        elemLi.draggable = true;
        elemLi.appendChild(elemCheckBox);
        elemLi.insertAdjacentElement("beforeend",elemBtn); 
        elemLi.appendChild(elemLabel);
             //check le localstorage finish et ajout un checked au checkbox selectionner
        for (const finish of tempFinishTaksArray) {
            if(cpt == parseInt(finish)){
                elemCheckBox.checked = true; 
                const parentElem = elemCheckBox.parentNode
                parentElem.classList.add('checked');   
            }                            
        }
        cpt++;
    }
        /**
        * ajout une eventlistener sur chaque button des taks 
        * et lanche la fucntion removetask avec id du button
        */
        const btnDelete = listTasks.querySelectorAll('button');
        for (const btn of btnDelete) {
            btn.addEventListener('click',event =>{
                removeTask(event.target.id);
            });
        }
        /**
        * ajout une eventlistener sur chaque checkbox des taks 
        * et lanche la fucntion removetask avec id du button
        */
        const btnfinsih = listTasks.querySelectorAll('input[type=checkbox]');
        for (const btn of btnfinsih) {
            btn.addEventListener('change',event =>{
                if(event.target.checked == true){
                    finishTtaskAdd(event.target.id);
                }else{
                    finishTtaskRemove(event.target.id);
                }
            });
        }
        //console.log(tempTaksArray);
        // drag and drop
        let Dragitems = ulListTasks.querySelectorAll('li');
        Dragitems.forEach(function (dragItem) {
            dragItem.addEventListener('dragstart', handleDragStart);
            dragItem.addEventListener('dragover', handleDragOver);
            dragItem.addEventListener('dragenter', handleDragEnter);
            dragItem.addEventListener('dragleave', handleDragLeave);
            dragItem.addEventListener('dragend', handleDragEnd);
            dragItem.addEventListener('drop', handleDrop);
        });
}
/**
 * Ajout id de la task dans le localstorage finish
 * @param {*} id de la task
 */
function finishTtaskAdd(id){  
    tempFinishTaksArray.push(id);
    setItem('Finish',tempFinishTaksArray); 
    listingTasks();
    //console.log(getItem('Finish',tempFinishTaksArray));
}
/**
 * Supprime id de la task dans le localstorage finish
 * @param {*} id de la task
 */
function finishTtaskRemove(id){
    const finishTaksArray = Array.from(getItem('Finish')); 

    // verifie la position de 'id dans le array et le supprime
    let index = finishTaksArray.indexOf(id);
    console.log(index);
    if (index !== -1) {
        finishTaksArray.splice(index, 1);
    }

    setItem('Finish',finishTaksArray);   
    listingTasks();
}
/**
 * ajout un task dans le localstorage Task
 * @param {*} event eevnt du eventlistener 
 */
function addTask(event){
    const task = event.querySelector('#task').value;
    tempTaksArray = Array.from(getItem('Tasks'));        
    tempTaksArray.push(task);

    event.querySelector('#task').value = "";

    setItem('Tasks',tempTaksArray ); 
    listingTasks();
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
        if(i != parseInt(id))
            tempTaksArray.push(TaksArray[i]);        
    }
  
    setItem('Tasks',tempTaksArray );   
    finishTtaskRemove(id);
    listingTasks();
} 
/**
 * Refresh le listing en supprimeant les Li 
 */
function linstingTasksRefresh(){
    
    const liTasks = ulListTasks.querySelectorAll('li');
    const titleTasks = divAdd.querySelector('#title');
    const task = divAdd.querySelector('#task');  

    for (const li of liTasks) {
        ulListTasks.removeChild(li);
    }
}


listingTasks();