import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

//Imported models
import { ArtCollection } from './../models/ArtCollection';


@Injectable({
  providedIn: 'root'
})
export class ArtCollectionService {

  artCollections: Array<ArtCollection>;
  artCollection: ArtCollection;
  private updatedCollections = new Subject<Array<ArtCollection>>();

  constructor(private http: HttpClient) { }

  getArtCollections (): Observable<Array<ArtCollection>> {
    this.http.get<Array<ArtCollection>>('http://localhost:3000/api/artCollections')
      .subscribe((artCollectionsData) => {
        this.artCollections = artCollectionsData;
        this.updatedCollections.next([...this.artCollections]);

      })

      return this.updatedCollections;
  }

  getArtCollection (): Observable<ArtCollection> {
    return;
  }

  addArtCollection(artCollection: ArtCollection){

  }

}
