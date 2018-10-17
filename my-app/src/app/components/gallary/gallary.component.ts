import { Component, OnInit } from '@angular/core';

//Imported models
import { ArtCollection } from '../../models/ArtCollection';

//Imported services
import { ArtCollectionService } from './../../services/art-collection.service';



@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {

  displayedImg: HTMLElement;
  collectionsHolder: HTMLElement;
  artCollections: Array<ArtCollection>;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    this.displayedImg = document.getElementById('displayedImg');
    this.collectionsHolder = document.getElementById('collections');
    this.getArtCollections();

  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections
        console.log(artCollections, this.artCollections);

        this.showCollectionsInDOM(this.artCollections);
      });

      
      
  }

  showCollectionsInDOM(artCollections){
    console.log(artCollections);
    this.displayedImg.setAttribute('src', artCollections[0].artCollection[0]);
    this.startSlideShow();

    for(let i = 0; i < artCollections.length; i++){
      let collectionTitleElement = document.createElement('p');
      collectionTitleElement.innerHTML = artCollections[i].title;
      collectionTitleElement.setAttribute('class', 'collection');
      if(i == 0){
        collectionTitleElement.setAttribute('class', 'collection activeCollection');        
      }

      this.collectionsHolder.appendChild(collectionTitleElement);
    }
    
  }

  startSlideShow(){
    console.log('Start image slide show');
  }

}
