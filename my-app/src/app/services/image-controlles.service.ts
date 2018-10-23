import { Injectable } from "@angular/core";
import { GlobalServiceService } from "./global-service.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ImageControllesService {

  images: NodeList;
  holders: NodeList;
  newImgPaths: Object;
  previewFiles = [];
  imagePreviews = []; 

  constructor(private globalService: GlobalServiceService, private http: HttpClient) {}

  getPreviewImages(uploadedImges){
 
    for(let i = 0; i < uploadedImges.length; i++){
      let uploadedImg = uploadedImges[i];
      this.previewFiles.push(uploadedImg);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result);
      };
      reader.readAsDataURL(uploadedImg);
    }

    return { previewFiles: this.previewFiles, imagePreviews: this.imagePreviews};
  }

  dropImg(e, container, array?) {
    this.images = document.querySelectorAll(".previewImg");
    this.holders = document.querySelectorAll(".imgHolder");
    for (let i = 0; i < this.images.length; i++) {
      let image = this.images[i] as HTMLElement;
      image.setAttribute("id", "previewImg" + i);
    }

    let dropIndex;
    const dropedImg = e.target as HTMLElement;
    const dropedImgIndex = dropedImg.getAttribute('data-index');
    const holderToDrop = e.target.parentElement;
    const droppedXpost = e.clientX;
    const droppedYpost = dropedImg.offsetTop - 10;

    for (let i = 0; i < this.images.length; i++) {
      let insertBefore = this.holders[i] as HTMLElement;
      let image = this.images[i] as HTMLElement;
      let first = this.images[0] as HTMLElement;
      let insertFirst = this.holders[0] as HTMLElement;
      let imgPos = image.offsetLeft + image.clientWidth;
      let imgPosTop = image.offsetTop;
      let prevImage;
      let prevImgPos;      

      if (i != 0) {
        prevImage = this.images[i - 1] as HTMLElement;
        prevImgPos = prevImage.offsetLeft;        

        if (
          droppedXpost < imgPos &&
          droppedXpost > prevImgPos + prevImage.clientWidth / 2 &&
          droppedYpost < imgPosTop
        ) {
          container.insertBefore(holderToDrop, insertBefore);
          dropIndex = i;
          i = this.images.length;
        }
      }
      if (
        droppedXpost < first.offsetLeft + first.clientWidth &&
        droppedYpost < first.offsetTop + 180
      ) {
        container.insertBefore(holderToDrop, insertFirst);
        dropIndex = 0;
        i = this.images.length;
      }
    }
    this.globalService.setNewPosFileArray(array, dropedImgIndex, dropIndex);
  }

  uploadImages(art: Array<any>){
    let newPaths
    const newImages = new FormData();
    for(let i = 0; i < art.length; i++){
      newImages.append("images", art[i]);
    }
       
    this.http.post('http://localhost:3000/api/artCollections/addImages', newImages)
    .subscribe((res) => {
      this.newImgPaths = res;
    });

  }

  removeImg(arrayOne, index, arrayTwo?) {
    console.log(arrayOne, arrayTwo);
    arrayOne.splice(index, 1);
    if(arrayTwo){
      arrayTwo.splice(index, 1);  
    }
    console.log(arrayOne, arrayTwo);
    
  }
}
