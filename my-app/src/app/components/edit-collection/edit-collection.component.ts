import { async } from '@angular/core/testing';
import { ImageControllesService } from './../../services/image-controlles.service';
import { Component, OnInit } from '@angular/core';
import { ArtCollectionService } from '../../services/art-collection.service';
import { ArtCollection } from '../../models/ArtCollection';

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
    private imgControlles: ImageControllesService
    ) { }

  //Hide footer and get artCollections
  ngOnInit() {
    document.getElementById('footer').style.display = 'none';
    this.getArtCollections();
  }

  //Function to get artCollection from the artCollection service
  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections;
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
      if(i == index) imgHolder.style.display = 'block';
    } 
    // Set this.edit to the index, 
    // to switch the HTML template of the collection you want 
    // to edit to the editForm template
    this.edit = index;
  }

  //Close edit by setting edit index to -1 or some other value below 0
  closeEdit(){
    this.edit = -1
  }

  //Function to update the art collection
  updateCollection(e, index, title, id){
    //Create a new object with the updated values
    const updatedCollection = {
      id: id,
      title: title,
      artCollection: this.artCollections[index].artCollection
    }
    //Set the collection to the updated values to display it in the front end
    this.artCollections[index] = updatedCollection;
    
    //Send the updated collection to the service
    this.artCollectionService.updateArtCollection(updatedCollection);
    this.closeEdit();
  }

  //Function to add images to the update preview
  addImages(e, index){    
    //First use the newly added files to get temp URL's and files
    let files = this.imgControlles.getPreviewImages(e.target.files); 
    //Save the corresponding key value pairs to previewFiles and imagePreviews
    this.previewFiles = files['previewFiles'];
    this.imagePreviews = files['imagePreviews'];

    //Use the files to realy upload the images and get back real URL's
    //The real URL's will be stored in this.imgControlles.newImgPaths inside the service
    this.imgControlles.uploadImages(this.previewFiles);

    //Set timeout is a temp fix
    setTimeout(() => {
      //Set the artCollection array of the corresponding art Collection
      //Equal to a copy of the current aray + a coppy of the imagesPreviews
      //This way the temp URL's will be rendered in the ngFor
      this.artCollections[index].artCollection = [...this.artCollections[index].artCollection, ...this.imagePreviews];
    }, 100);
  }

  //Swap images inside the preview
  swapImg(e, collection){
    this.imgHolder = document.getElementById('collectionImages'); 
    this.imgControlles.dropImg(e, this.imgHolder, collection); 
  }
  //Remove images inside the preview
  removeImg(e, array){
    this.imgControlles.removeImg(e, array);
  }
  //Delete a collection
  deleteCollection(collectionId, el){
    el.remove();
    this.artCollectionService.deleteArtCollection(collectionId);
  }

}
