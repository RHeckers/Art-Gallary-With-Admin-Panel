import { Component, OnInit } from '@angular/core';

//Imported services
import { ArtCollectionService } from '../../services/art-collection.service';
import { ImageControllesService } from '../../services/image-controlles.service';
import { GlobalServiceService } from '../../services/global-service.service';

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
  titleInput: HTMLElement
  previewHeader: HTMLElement

  constructor(
    private artCollectionService: ArtCollectionService, 
    private imgControlles: ImageControllesService,
    private globalService: GlobalServiceService) {
   }

  ngOnInit() {
    document.getElementById('footer').style.display = 'none';
    this.imgInput = document.getElementById('imgInput');
    this.imgHolder = document.getElementById('previewImages'); 
    this.titleInput = document.getElementById('titleInput'); 
    this.previewHeader = document.getElementById('previewHeader'); 
  }

  addCollection(){
    if(this.collectionTitle && this.previewFiles != []){
      this.artCollectionService.addArtCollection(this.collectionTitle, this.previewFiles);  
    }

    if(!this.collectionTitle || this.collectionTitle.length < 3 || this.collectionTitle.length > 25){
      this.globalService.insertError('Title needs to be between 3 and 25 characters', this.titleInput)
    }
    if(this.previewFiles != []){
      this.globalService.insertError('There needs to be at least one picture in the collection', this.previewHeader)
    } 
  }

  getPreviewImages(e){
    this.previewFiles = this.imgControlles.getPreviewImages(e.target.files)['previewFiles'];
    this.imagePreviews = this.imgControlles.getPreviewImages(e.target.files)['imagePreviews'];
  }

  swapImg(e){
    this.imgControlles.dropImg(e, this.imgHolder, this.previewFiles);   
  }

  removeImg(e){
    this.imgControlles.removeImg(e, this.previewFiles);    
  }
}
