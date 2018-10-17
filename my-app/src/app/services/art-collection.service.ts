import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Imported models
import { ArtCollection } from './../models/ArtCollection';


@Injectable({
  providedIn: 'root'
})
export class ArtCollectionService {

  artCollections: Array<ArtCollection>;
  artCollection: ArtCollection;

  constructor() { }

  getArtCollections (): Observable<Array<ArtCollection>> {
    return ;
  }

  getArtCollection (): Observable<ArtCollection> {
    return;
  }

  addArtCollection(artCollection: ArtCollection){

  }

}
