import { Component, OnInit } from '@angular/core';

//Imported services
import { ArtCollectionService } from '../../services/art-collection.service';
import { ImageControllesService } from '../../services/image-controlles.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  collectionTitle: string;
  dragedImgOffset: number;
  imgHolder: HTMLElement;
  imgInput: HTMLElement;
  images: NodeList;
  holders: NodeList;
  imagePreviews: Array<any> = [];
  previewFiles: Array<File> = [];

  constructor(private artCollectionService: ArtCollectionService, private imgControlles: ImageControllesService) {
   }

  ngOnInit() {
    document.getElementById('footer').style.display = 'none';
    this.imgInput = document.getElementById('imgInput');
    this.imgHolder = document.getElementById('previewImages');
  }

  addCollection(){
    this.artCollectionService.addArtCollection(this.collectionTitle, this.previewFiles);
  }

  uploadImg(e){
    const uploadedImges = e.target.files;
  
    for(let i = 0; i < uploadedImges.length; i++){
      let uploadedImg = uploadedImges[i];
      this.previewFiles.push(uploadedImg);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result) ;
      };
      reader.readAsDataURL(uploadedImg);
    }
  }

  swapImg(e){
    this.imgControlles.dropImg(e, this.imgHolder, this.previewFiles);   
  }

  removeImg(e){
    this.imgControlles.removeImg(e, this.previewFiles);    
  }
}
