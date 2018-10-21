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

  constructor(private artCollectionService: ArtCollectionService, private imgControlles: ImageControllesService) { }

  ngOnInit() {
    document.getElementById('footer').style.display = 'none';
    this.getArtCollections();
  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections
      });
  }

  startEdit(e, index){
    this.imgHolders = document.querySelectorAll('.collectionImages'); 
    this.imgControlles.newImgPaths = [];

    for(let i = 0; i < this.imgHolders.length; i++){
      const imgHolder = this.imgHolders[i] as HTMLElement;
      imgHolder.style.display = 'none';

      if(i == index){
        imgHolder.style.display = 'block';
      }
    }
    this.edit = index;
  }

  updateCollection(e, index, title, id){
    const updatedCollection = {
      id: id,
      title: title,
      artCollection: this.artCollections[index].artCollection
    }
    this.artCollectionService.updateArtCollection(updatedCollection);
  }

  addImages(e, index){    
    this.previewFiles = this.imgControlles.getPreviewImages(e.target.files)['previewFiles'];
    this.imagePreviews = this.imgControlles.getPreviewImages(e.target.files)['imagePreviews']
    this.imgControlles.uploadImages(this.previewFiles);

    //Set timeout is a temp fix
    setTimeout(() => {
      this.artCollections[index].artCollection = [...this.artCollections[index].artCollection, ...this.imagePreviews];
      console.log(this.artCollections[index].artCollection); 
    }, 100);
  }


  swapImg(e, collection){
    this.imgHolder = document.getElementById('collectionImages'); 
    this.imgControlles.dropImg(e, this.imgHolder, collection); 
  }

  removeImg(e, array){
    this.imgControlles.removeImg(e, array);
  }

  deleteCollection(collectionId){
    console.log(collectionId);
    this.artCollectionService.deleteArtCollection(collectionId);
  }

}
