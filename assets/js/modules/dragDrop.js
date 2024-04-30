import { setItem, getItem } from './localstorage.js';

  var dragSrcEl = null;

export function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

export  function handleDragEnd(e) {
    this.style.opacity = '1';
    const dragArray = [];
  
    const items = document.querySelectorAll('li');

    items.forEach(function (item) {
      item.classList.remove('over');
    });

    const parentItem = e.target.parentNode; 
    const childrenItem = parentItem.children;
    for (const children of childrenItem) {
        const labelChildern = children.querySelector('label');
        dragArray.push(labelChildern.innerHTML);
    }
    setItem('Tasks',dragArray ); 
    location.reload();
    //console.log(dragArray);         
}

export function handleDragOver(e) {
    e.preventDefault();
    return false;
  }
export function handleDragEnter(e) {
    this.classList.add('over');
  }
export function handleDragLeave(e) {
    this.classList.remove('over');
}
export function handleDrop(e) {
    e.stopPropagation(); // stops the browser from redirecting.
 
  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
 
  return false;
  }
