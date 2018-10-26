import { GlobalServiceService } from './../../services/global-service.service';
import { async } from '@angular/core/testing';
import { ImageControllesService } from './../../services/image-controlles.service';
import { Component, OnInit } from '@angular/core';
import { ArtCollectionService } from '../../services/art-collection.service';
import { ArtCollection } from '../../models/ArtCollection';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  artCollections: Array<ArtCollection>;
  imgHolders: NodeList;
  imgHolder: HTMLElement;
  edit: number;
  previewFiles;
  imagePreviews;

  //Inject services
  constructor(
    private artCollectionService: ArtCollectionService, 
    private imgControlles: ImageControllesService,
    private globalService: GlobalServiceService
    ) { }

  //Hide footer and get artCollections
  ngOnInit() {
    // document.getElementById('footer').style.display = 'none';
    this.getArtCollections();
  }

  //Function to get artCollection from the artCollection service
  getArtCollections(): void {
    this.globalService.setLoader(true);
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections;
        this.globalService.setLoader(false);
      });
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  //Function to start editing an art collection
  startEdit(e, index){
    //Empty the previously filled arrays inside the service
    this.imgControlles.previewFiles = [];
    this.imgControlles.imagePreviews = [];
    this.imgControlles.newImgPaths = [];
    //Get all image holders
    this.imgHolders = document.querySelectorAll('.collectionImages');
    
    //Hide all image holders and show the one corresponding to the art Collection to edit
    for(let i = 0; i < this.imgHolders.length; i++){
      const imgHolder = this.imgHolders[i] as HTMLElement;
      imgHolder.style.display = 'none';
      if(i === index) imgHolder.style.display = 'block';
    } 
    // Set this.edit to the index, 
    // to switch the HTML template of the collection you want 
    // to edit to the editForm template
    this.edit = index;
  }

  //Close edit by setting edit index to -1 or some other value below 0
  closeEdit(){
    this.edit = -1;
  }

  //Function to update the art collection
  updateCollection(e, index, title, id, description){
    this.globalService.setLoader(true);
    //Create a new object with the updated values
    const updatedCollection = {
      index: index,
      id: id,
      title: title,
      description: description,
      artCollection: this.artCollections[index].artCollection
    }
    //Set the collection to the updated values to display it in the front end
    this.artCollections[index] = updatedCollection;

    //Remove images from storage
    
    //Send the updated collection to the service
    this.artCollectionService.updateArtCollection(updatedCollection);
    this.closeEdit();

  }

  //Function to add images to the update preview
  addImages(e, index){        
    this.previewFiles = [];
    this.imagePreviews = [];
    this.imgControlles.previewFiles = [];
    this.imgControlles.imagePreviews = [];
    //First use the newly added files to get temp URL's and files
    let files = this.imgControlles.getPreviewImages(e.target.files); 
    //Save the corresponding key value pairs to previewFiles and imagePreviews
    this.previewFiles = files['previewFiles'];
    this.imagePreviews = files['imagePreviews'];

    //Use the files to realy upload the images and get back real URL's
    //The real URL's will be stored in this.imgControlles.newImgPaths inside the service
    this.imgControlles.uploadImages(this.previewFiles);

    this.globalService.setLoader(true);
    //Set timeout is a temp fix for async file reader
    setTimeout(() => {
      this.globalService.setLoader(false);
      //Set the artCollection array of the corresponding art Collection
      //Equal to a copy of the current aray + a coppy of the imagesPreviews
      //This way the temp URL's will be rendered in the ngFor
      this.artCollections[index].artCollection = [...this.artCollections[index].artCollection, ...this.imagePreviews];
    }, 500);
  }

  //Swap images inside the preview
  swapImg(e, collection){
    this.imgHolder = document.getElementById('collectionImages'); 
    this.imgControlles.dropImg(e, this.imgHolder, collection); 
  }
  //Remove images inside the preview
  removeImg(index, array){
    this.imgControlles.removeImg(array, index);
  }
  //Delete a collection
  deleteCollection(collectionId, el){
    this.globalService.setLoader(true);
    el.remove();
    this.artCollectionService.deleteArtCollection(collectionId);
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousIndex, event.currentIndex);

    moveItemInArray(this.artCollections, event.previousIndex, event.currentIndex);
    for( let i = 0; i < this.artCollections.length; i++) {
      this.artCollections[i]['index'] = i; }
    this.artCollectionService.bulkUpdateArtcollections(this.artCollections);
    console.log( this.artCollections[0].id);

  }
}
