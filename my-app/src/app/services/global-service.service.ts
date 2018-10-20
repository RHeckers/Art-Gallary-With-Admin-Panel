import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor() { }

  setNewPosFileArray(arr, from, to) {
    let cutOut = arr.splice(from, 1) [0];
    arr.splice(to, 0, cutOut); 
    console.log(arr);
    return arr;
  };
}
