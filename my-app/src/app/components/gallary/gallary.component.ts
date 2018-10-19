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
  automatedSlides: Boolean;
  delay: number;
  collectionToUse: Array<string> = [];
  imgIndex: number;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    this.automatedSlides = true;
    this.delay = 5;
    this.collectionsHolder = document.getElementById('collections');
    this.displayedImg = document.getElementById('displayedImg');
    this.displayedImg.style.height = window.innerHeight / 2 + 'px';
    this.getArtCollections();
    this.imgIndex = 0;
  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections
        console.log(artCollections, this.artCollections);
        this.slideShow('firstRun');
      });   
  }


  slideShow(e): void {
    if(e === 'firstRun'){
      this.collectionToUse = this.artCollections[0].artCollection;
      this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex]);
    }else if(e === Event){
      const clickedId = e.target.attributes['id'].value;
      const idTextLength = clickedId.length - 1;
      const index = parseInt(clickedId.charAt(idTextLength));
      this.collectionToUse = this.artCollections[index].artCollection;
      this.activeImg = this.collectionToUse[this.imgIndex];
    }

    const nextImg = () => {
      if(this.imgIndex < this.collectionToUse.length - 1){
        this.imgIndex++;
      }else{
        this.imgIndex = 0;
      }
      TweenMax.to(this.displayedImg, 1, {delay: 0.8, opacity: 1, onComplete: startAnimation});
      setTimeout(() => {
        this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex])
      }, 720);
      
    }
    
    const startAnimation = () => {
      if(this.automatedSlides){
        TweenMax.to(this.displayedImg, 1, {delay: this.delay, opacity: 0, onStart: nextImg});  
      }
    }

    startAnimation()

  }

  getInputValue(e): void{
    switch (e.target.id) {
      case "automatedCheckbox":
        const value = e.target.checked;     
        this.automatedSlides = value;
        if(value === true){ 
          this.slideShow('restart');          
        }
        break;
    
      case "delayInput":
        this.delay = e.target.value
        break;

      default:
        break;
    }
  }

  

}
