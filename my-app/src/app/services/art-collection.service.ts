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

  private artCollections: Array<ArtCollection> = [];
  private artCollection: ArtCollection;
  private updatedCollections = new Subject<Array<ArtCollection>>();

  constructor(private http: HttpClient) { }

  getArtCollections (): Observable<Array<ArtCollection>> {
    this.http.get<Array<any>>('http://localhost:3000/api/artCollections')
      .pipe(map((data) => {
        return data.map(artCollection => {
          return {
            title: artCollection.title,
            artCollection: artCollection.artCollection,
            id: artCollection._id
          };
        });
      }))
      .subscribe((artCollectionsData) => {
        this.artCollections = artCollectionsData;
        this.updatedCollections.next([...this.artCollections]);

      })

      return this.updatedCollections;
  }

  getArtCollection (): Observable<ArtCollection> {
    return;
  }

  addArtCollection(title: string, art: Array<any>){
    const artCollectionData = new FormData();
    artCollectionData.append("title", title);  
    for(let i = 0; i < art.length; i++){
        artCollectionData.append("images", art[i]);
    }
      
    this.http.post<ArtCollection>('http://localhost:3000/api/artCollection', artCollectionData)
    .subscribe((res) => {
        console.log(res)
      const newCollection = {id: res.id, title: title, artCollection: res.artCollection}
      console.log(newCollection);
      this.artCollections.push(newCollection);
      this.updatedCollections.next([...this.artCollections]);
    })
    

  }

}