import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageControllesService {

  images: NodeList;
  holders: NodeList;

  constructor(private globalService: GlobalServiceService) { }

  dropImg(e, container, array?){
    this.images = document.querySelectorAll('.previewImg');
    this.holders = document.querySelectorAll('.imgHolder');
    for(let i = 0; i < this.images.length; i++){
      let image = this.images[i] as HTMLElement;
      image.setAttribute('id', 'previewImg' + i);  
    }
    let dropedImgIndex;
    let dropIndex;
    const dropedImg = e.target;
    const holderToDrop = e.target.parentElement;
    const droppedXpost = e.clientX
    const droppedYpost = e.clientY
    
    for(let i = 0; i < this.images.length; i++){
      let insertBefore = this.holders[i] as HTMLElement;
      let image = this.images[i] as HTMLElement;
      let first = this.images[0] as HTMLElement;
      let last = this.images[this.images.length - 1] as HTMLElement;
      let insertFirst = this.holders[0] as HTMLElement;
      let imgPos = image.offsetLeft + image.clientWidth;
      let imgPosTop = image.offsetTop;
      let prevImage;
      let prevImgPos;

      if(i != 0){
        prevImage = this.images[i - 1] as HTMLElement;
        prevImgPos = prevImage.offsetLeft;
      } 
      
      if(dropedImg == image){
        dropedImgIndex = i;
      } 
      
      if(droppedXpost < first.offsetLeft + first.clientWidth && droppedYpost < first.offsetTop + 100){
        container.insertBefore(holderToDrop, insertFirst);
        dropIndex = 0;
      }

      else if(droppedXpost > last.offsetLeft + last.clientWidth && droppedYpost < last.offsetTop + 100){
        container.appendChild(holderToDrop);
        dropIndex = i;
      }
      
      else if( droppedXpost < imgPos && droppedXpost > prevImgPos + prevImage.clientWidth && droppedYpost < imgPosTop + 100){
        container.insertBefore(holderToDrop, insertBefore);
        dropIndex = i - 1;
      }  
    }
    
    this.globalService.setNewPosFileArray(array, dropedImgIndex, dropIndex)
    return [dropedImgIndex, dropIndex];
  }

  removeImg(e, array?){
    this.holders = document.querySelectorAll('.imgHolder');
    const indexToDelete = e.target.attributes['data-index']['value'];
    let elementToRemove = this.holders[indexToDelete] as HTMLElement;
    elementToRemove.style.display = "none";
    array.splice(indexToDelete, 1);
    return indexToDelete;
  }
}
 