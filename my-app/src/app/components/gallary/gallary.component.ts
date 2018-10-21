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
  activated: boolean;
  artCollections: Array<ArtCollection>;
  delay: number;
  fadeInDelay: number;
  collectionToUse: Array<string> = [];
  imgIndex: number;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    this.delay = 7;
    this.fadeInDelay = 0.8;
    this.imgIndex = 0;
    this.activated = true;
    this.collectionsHolder = document.getElementById('collections');
    this.displayedImg = document.getElementById('displayedImg');
    this.displayedImg.style.height = window.innerHeight / 2 + 'px';
    this.getArtCollections();
    
  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections;
        console.log(this.artCollections)
        this.activateCollection('firstRun');
      });   
  }

  activateCollection(e): void {
    this.imgIndex = 0;
    if(e === 'firstRun'){
      this.collectionToUse = this.artCollections[0].artCollection;
      this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex]);
    }else if(e.target){
      TweenMax.killAll();
      const clickedId = e.target.attributes['id'].value;
      const idTextLength = clickedId.length - 1;
      const index = parseInt(clickedId.charAt(idTextLength));
      this.collectionToUse = this.artCollections[index].artCollection;
      this.activeImg = this.collectionToUse[this.imgIndex];
    }

     if(this.activated) this.startAnimation();

  }

  autoSwitchImg = () => {
    if(this.imgIndex < this.collectionToUse.length - 1){
      this.imgIndex++;
    }else{
      this.imgIndex = 0;
    }
    TweenMax.to(this.displayedImg, 0.5, {delay: 0.8, opacity: 1, onComplete: this.startAnimation});
    setTimeout(() => {
      this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex])
    }, 720);
    
  }

  manualSwitchImg(direction){
    switch (direction) {
      case "prev":
        if(this.imgIndex > 0){
          this.imgIndex--;
        }else{
          this.imgIndex = this.collectionToUse.length - 1;
        }
        TweenMax.to(this.displayedImg, 1, {delay: 0, opacity: 0});
        setTimeout(() => {
          this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex])
        }, 850);
        TweenMax.to(this.displayedImg, 1, {delay: 0.95, opacity: 1});

        
        break;
      case "next":
        if(this.imgIndex < this.collectionToUse.length - 1){
          this.imgIndex++;
        }else{
          this.imgIndex = 0;
        }
        TweenMax.to(this.displayedImg, 1, {delay: 0, opacity: 0});
        setTimeout(() => {
          this.displayedImg.setAttribute('src', this.collectionToUse[this.imgIndex])
        }, 850);
        TweenMax.to(this.displayedImg, 1, {delay: 0.95, opacity: 1});
        
        break;
      default:
        break;
    }

  }

  startAnimation = () => {
    TweenMax.to(this.displayedImg, 1, {delay: this.delay, opacity: 0, onStart: this.autoSwitchImg});  
  }

  getInputValue(e): void{
    switch (e.target.id) {
      case "automatedCheckbox":
        const value = e.target.checked;     
        TweenMax.pauseAll();
        this.activated = false;
        if(value === true){ 
          this.activated = true;
          TweenMax.resumeAll();         
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
