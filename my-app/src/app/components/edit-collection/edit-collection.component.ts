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

  constructor(private artCollectionService: ArtCollectionService) { }

  ngOnInit() {
    this.getArtCollections();
  }

  getArtCollections(): void {
    this.artCollectionService.getArtCollections()
      .subscribe(artCollections => {
        this.artCollections = artCollections
        console.log(this.artCollections);
      });
  }

}
