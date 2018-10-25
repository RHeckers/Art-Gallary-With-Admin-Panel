import { GlobalServiceService } from './global-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

//Imported models
import { ArtCollection } from './../models/ArtCollection';

//Imported services
import { ImageControllesService } from './image-controlles.service';
import { AuthService } from './auth.service';





@Injectable({
  providedIn: 'root'
})
export class ArtCollectionService {

  private artCollections: Array<ArtCollection> = [];
  private updatedCollections = new Subject<Array<ArtCollection>>();

  //Injections
  constructor(
    private http: HttpClient, 
    private imgControlles: ImageControllesService,
    private auth: AuthService,
    private globalService: GlobalServiceService
    ) { }

  //Get the art collections from the backend
  getArtCollections (): Observable<Array<ArtCollection>> {
    //Make the API GET request
    this.http.get<Array<any>>('http://localhost:3000/api/artCollections')
      .pipe(map((data) => {
        //Map the data to new objects where _id = id
        return data.map(artCollection => {
          return {
            index: artCollection.index,
            title: artCollection.title,
            artCollection: artCollection.artCollection,
            id: artCollection._id
          };
        });
      }))
      .subscribe((artCollectionsData) => {
        this.artCollections = artCollectionsData;
        this.updatedCollections.next([...this.artCollections]);
      });

      return this.updatedCollections;
  }

  //Add a art collection
  addArtCollection(index: number, title: string, art: Array<any>){
    //Create FormData so you can append files
    const artCollectionData = new FormData();
    artCollectionData.append("title", title);
    for(let i = 0; i < art.length; i++){
        artCollectionData.append("images", art[i]);
    }
    //Make the post request
    this.http.post<ArtCollection>('http://localhost:3000/api/artCollections', artCollectionData)
    .subscribe((res) => {
      //Add the artCollection to the current collections
      const newCollection = {index: res.index, id: res.id, title: title, artCollection: res.artCollection}
      this.artCollections.unshift(newCollection);
      this.updatedCollections.next([...this.artCollections]);
      this.globalService.setLoader(false);
    });
  }

  //Update an art Collection
  updateArtCollection(collection){
    let images = collection.artCollection;
    let indexes = []
    //Find the images that dont have a valid URL and push the index to indexes arr
    for(let i = 0; i < images.length; i++){
      const image = images[i];
      if(!image.includes('http://')){
        indexes.push(i);
      }
    }
    //Get the images that dont have a valid ID and assign it with a valid one
    for(let i = 0; i < indexes.length; i++){
      const arrIndex = indexes[i];
      images[arrIndex] = this.imgControlles.newImgPaths[i];
    }
    //Create a new object with the updated values including the new valid URL's
    const updatedCollection = {
      index: collection.index,
      id: collection.id,
      title: collection.title,
      artCollection: images
    }

    //Make the put request to update the collection
    this.http.put('http://localhost:3000/api/artCollections/' + collection.id, updatedCollection)
      .subscribe(res => {
        console.log(res);
        this.globalService.setLoader(false);
      });
  }
  //Delete an art collection
  deleteArtCollection(collectionId: string){
    this.http.delete('http://localhost:3000/api/artCollections/' + collectionId)
     .subscribe(() => {
       this.globalService.setLoader(false);
       console.log("Collection deleted!")
      });
  }

}