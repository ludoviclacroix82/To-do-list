/**
 * Ajout l'info dans le localStorage
 * @param {*} name nom de ta task
 * @param {*} value detail de la task
 */
export function setItem(name,value){
    return localStorage.setItem(name,JSON.stringify(value));
}
/**
 * recupere l'info dans le LocalStorage
 * @param {*} title 
 */
export function getItem(title){
    const checkItem = localStorage.getItem(title);
    
    // check si il existe ou pas 
    if( checkItem !== null)
        return  JSON.parse(localStorage.getItem(title));
    else
        setItem(title,'');
        return  JSON.parse(localStorage.getItem(title));

}
