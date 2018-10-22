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
  imgHolder: HTMLElement;
  imgInput: HTMLElement;
  imagePreviews: Array<any> = [];
  previewFiles: Array<File> = [];
  titleInput: HTMLElement
  previewHeader: HTMLElement

  constructor(
    private artCollectionService: ArtCollectionService, 
    private imgControlles: ImageControllesService,
    private globalService: GlobalServiceService,
    ) {
   }

  ngOnInit() {
    //Hide footer
    document.getElementById('footer').style.display = 'none';

    //Get HTML elements by ID
    this.imgInput = document.getElementById('imgInput');
    this.imgHolder = document.getElementById('previewImages'); 
    this.titleInput = document.getElementById('titleInput'); 
    this.previewHeader = document.getElementById('previewHeader'); 
  }

  //Function to add a collection and empty the form
  addCollection(){
    //Check if there is a title and images in the upload preivew
    if(this.collectionTitle && this.previewFiles != []){
      this.artCollectionService.addArtCollection(this.collectionTitle, this.previewFiles); 
      this.imgControlles.imagePreviews = [];
      this.imgControlles.previewFiles = [];
      this.imagePreviews = []
      this.previewFiles = [];
      this.collectionTitle = '';
      return;
    }

    //If there is no title or the title is to short, insert error message
    if(!this.collectionTitle || 
       this.collectionTitle.length < 3 || 
       this.collectionTitle.length > 25){
        this.globalService.insertError(
          'Title needs to be between 3 and 25 characters', 
          this.titleInput);
    }
    //If there are no images to upload with the collection insert an error message
    if(this.previewFiles == []){
      this.globalService.insertError(
        'There needs to be at least one picture in the collection', 
        this.previewHeader);
    } 
  }

  //Function to add new images to the preview
  getPreviewImages(e){
    //Send the files to the service and get back the files and temp paths
    let files = this.imgControlles.getPreviewImages(e.target.files);
    //Assign the previewFiles and imagePrevies with the corresponding key value pairs 
    // from the returned object
    this.previewFiles = files['previewFiles'];
    this.imagePreviews = files['imagePreviews'];
  }

  //Function to swap the images in the preview
  swapImg(e){
    this.imgControlles.dropImg(e, this.imgHolder, this.previewFiles);   
  }

  //Function to remove the images from the preview
  removeImg(e){
    this.imgControlles.removeImg(e, this.previewFiles);    
  }
}
