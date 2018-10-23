import { Injectable } from '@angular/core';
import { window } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { 
  }

  //Switch possition in array
  setNewPosFileArray(arr, from, to) {
    let cutOut = arr.splice(from, 1) [0];
    arr.splice(to, 0, cutOut); 
    return arr;
  };

  setLoader(active){
    switch (active) {
      case true:
        const loaderDiv = document.createElement('div');
        loaderDiv.className = "loader";
        loaderDiv.style.marginTop ;
        const x = document.querySelector('body') as HTMLElement;
        x.appendChild(loaderDiv);        
        break;
      case false:
        const loader = document.querySelector('.loader');
        loader.remove();
        
        break;
    }
  }

  //Insert error message
  insertError(msg, insertAfter){
    let error = document.createElement('p');
    error.className = 'errorMsg';
    error.innerHTML = msg;
    insertAfter.parentNode.insertBefore(error, insertAfter.nextSibling);
    setTimeout(() => {
      error.remove();
    }, 3000);
  }
}
