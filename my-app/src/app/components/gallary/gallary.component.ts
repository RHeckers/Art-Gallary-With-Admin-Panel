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

  artCollections: Array<ArtCollection>;

  constructor(private artCollectionService: ArtCollectionService) {}

  ngOnInit() {
    this.getArtCollections();

  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => this.artCollections = artCollections);

  }

}
