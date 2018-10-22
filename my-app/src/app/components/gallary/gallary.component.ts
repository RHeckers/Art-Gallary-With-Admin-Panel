import { Component, OnInit, ViewChildren } from '@angular/core';

import {TweenMax} from "gsap";

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
  activated: boolean;
  artCollections: Array<ArtCollection>;
  delay: number;
  collectionToUse: Array<string> = [];
  imgIndex: number;
  collectionTitles: NodeList;

  //Watch for changes in the ngFor
  @ViewChildren('collectionTitles') artCollectionTitltes: any;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    //Initialize values
    this.delay = 7;
    this.imgIndex = 0;
    this.activated = true;
    this.displayedImg = document.getElementById('displayedImg');
    this.displayedImg.style.height = window.innerHeight / 2 + 'px';

    //Get the art collections
    this.getArtCollections();
  }

  //Wait for the view to initialize then subscribe to the viewChildren decorater 
  //Set the first title to red once the ngFor finished
  ngAfterViewInit() {
    this.artCollectionTitltes.changes.subscribe(t => {
      this.collectionTitles = document.querySelectorAll('.collection');
        const collectionTitle = this.collectionTitles[0] as HTMLElement;
        if(collectionTitle){
          collectionTitle.style.color = "red";      
        }
    });
  }

  //Get the art collections
  getArtCollections() {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections;
        //Active the image carousel
        this.activateCollection('firstRun');
      });   
  }

  //Function to activate the first or a new collection in the gallery 
  activateCollection(e, index?) { 

    if(e === 'firstRun'){
      //Activate the first collection
      this.collectionToUse = this.artCollections[0].artCollection;
      this.displayedImg.setAttribute('src', this.collectionToUse[0]);
    }else if(e.target){
      //Kill all animations
      TweenMax.killAll();
      //Get the collection to use and set the active img to the first image of its collection
      this.collectionToUse = this.artCollections[index].artCollection;
      this.activeImg = this.collectionToUse[0];

      //Make the clicked title red and the rest black
      for(let i = 0; i < this.collectionTitles.length; i++){
        const title = this.collectionTitles[i] as HTMLElement;
        if(i != index){
          title.style.color = "black";
        }else{
          title.style.color = "red";
        }
      }
    }
    //If automated is checked in the front end start animation
    if(this.activated) this.startAnimation();

  }

  //Switch images automaticly
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
  
  //Manualy switch images
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
    }
  }

  //Fade out the current image
  startAnimation = () => {
    TweenMax.to(this.displayedImg, 1, {delay: this.delay, opacity: 0, onStart: this.autoSwitchImg});  
  }

  //Get the values from the gallary controlles and assign them
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
