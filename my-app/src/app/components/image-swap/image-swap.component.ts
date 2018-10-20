import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-swap',
  templateUrl: './image-swap.component.html',
  styleUrls: ['./image-swap.component.css']
})
export class ImageSwapComponent implements OnInit {

  images: NodeList;

  constructor() { }

  ngOnInit() {
  }

  dropImg(e, container){
    this.images = document.querySelectorAll('.previewImg');
    console.log(this.images)

    for(let i = 0; i < this.images.length; i++){
      let image = this.images[i] as HTMLElement;
      image.setAttribute('id', 'previewImg' + i);  
    }

    let dropedImgIndex;
    let dropIndex;
    const dropedImg = e.target;
    const droppedXpost = e.clientX
    const droppedYpost = e.clientY
    
    for(let i = 0; i < this.images.length; i++){
      let image = this.images[i] as HTMLElement;
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

      if( droppedXpost < imgPos && 
          droppedXpost > prevImgPos &&
          droppedYpost < imgPosTop + 100){
            dropIndex = i - 1;
            container.insertBefore(e.target, image);
      }  
    }

    return [dropedImgIndex, dropIndex];
  }

}
