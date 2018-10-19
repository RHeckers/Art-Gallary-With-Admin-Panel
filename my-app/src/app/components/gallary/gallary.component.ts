import { Component, OnInit } from '@angular/core';

import {TweenMax, Power2, TimelineLite} from "gsap";

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

  activeImg: string;
  displayedImg: HTMLElement;
  collectionsHolder: HTMLElement;
  artCollections: Array<ArtCollection>;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    this.collectionsHolder = document.getElementById('collections');
    this.displayedImg = document.getElementById('displayedImg');
    this.displayedImg.style.maxHeight = window.innerHeight / 2 + 'px';
    this.getArtCollections();

  }


  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections
        console.log(artCollections, this.artCollections);
        this.slideShow('firstRun');
      });   
  }


  slideShow(e){
    let collectionToUse;
    let imgIndex = 0;
    if(e === 'firstRun'){
      collectionToUse = this.artCollections[0].artCollection;
      this.activeImg = collectionToUse[imgIndex];
    }else{
      const clickedId = e.target.attributes['id'].value;
      const idTextLength = clickedId.length - 1;
      const index = parseInt(clickedId.charAt(idTextLength));
      collectionToUse = this.artCollections[index].artCollection;
      this.activeImg = collectionToUse[imgIndex];
    }

    const nextImg = () => {
      if(imgIndex < collectionToUse.length - 1){
        imgIndex++;
      }else{
        imgIndex = 0;
      }
      TweenMax.to(this.displayedImg, 1, {delay: 0.8, opacity: 1, onComplete: startAnimation});
      setTimeout(() => {
        this.displayedImg.setAttribute('src', collectionToUse[imgIndex])
      }, 720);
      
    }
    
    const startAnimation = () => {
      TweenMax.to(this.displayedImg, 1, {delay: 5, opacity: 0, onStart: nextImg});      
    }

    startAnimation()

  }

  

}
