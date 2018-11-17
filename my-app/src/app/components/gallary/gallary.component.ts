import { Component, OnInit, ViewChildren } from '@angular/core';


//Imported models
import { ArtCollection } from '../../models/ArtCollection';

//Imported services
import { ArtCollectionService } from './../../services/art-collection.service';


import { SwiperConfigInterface } from 'ngx-swiper-wrapper';



@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {

  activeImg: string;
  description: string;
  displayedImg: HTMLElement;
  artCollections: Array<ArtCollection>;
  view: number;
  collectionToUse: Array<string> = [];
  imgIndex: number;
  collectionTitles: NodeList;

  //Watch for changes in the ngFor
  @ViewChildren('collectionTitles') artCollectionTitltes: any;


  swiperConfig: SwiperConfigInterface = {
    observer: true,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: false,
    },
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: true,
      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader',
    }
  }

  constructor(private artCollectionService: ArtCollectionService) {
  }

  ngOnInit() {
    // Get the art collections
    this.getArtCollections();
    this.view = 0;
    

  }

  // Wait for the view to initialize then subscribe to the viewChildren decorater
  // Set the first title to red once the ngFor finished
  ngAfterViewInit() {
    this.view = 0;
    this.artCollectionTitltes.changes.subscribe(t => {
      this.collectionTitles = document.querySelectorAll('.collection');
      const collectionTitle = this.collectionTitles[0] as HTMLElement;
      if (collectionTitle && this.view === 0){
          collectionTitle.style.textDecoration = 'underline';
      }
      });


      }


  // Get the art collections
  getArtCollections() {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections;

      });
  }

  //Function to activate the first or a new collection in the gallery 
  activateCollection(index?) {

      //Make the clicked title red and the rest black
      for(let i = 0; i < this.collectionTitles.length; i++){
        const title = this.collectionTitles[i] as HTMLElement;

        // to switch the HTML template of the collection you want
        // to edit to the editForm template
        this.view = index;

        if (i !== index) {
          title.style.color = "black";
          title.style.textDecoration = "none";

        } else {
          title.style.textDecoration = "underline";


        }


      }
    }
  }

