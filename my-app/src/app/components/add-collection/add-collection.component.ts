import { Component, OnInit } from '@angular/core';
import { ArtCollectionService } from '../../services/art-collection.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  imgInput: HTMLElement;
  collectionTitle: string;
  imagePreviews: Array<any> = [];
  previewFiles: Array<File> = [];

  constructor(private artCollectionService: ArtCollectionService) { }

  ngOnInit() {
    document.getElementById('footer').style.display = 'none';

    this.imgInput = document.getElementById('imgInput');
  }

  uploadImg(e){
    console.log(e);

    const uploadedImges = e.target.files;
    
    
    for(let i = 0; i < uploadedImges.length; i++){
      let uploadedImg = uploadedImges[i];
      this.previewFiles.unshift(uploadedImg);
      console.log(this.previewFiles);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.unshift(reader.result) ;
      };
      reader.readAsDataURL(uploadedImg);

    }
    console.log(uploadedImges); 
    
  }

  addCollection(){
    console.log(123);
    this.artCollectionService.addArtCollection(this.collectionTitle, this.previewFiles);
  }

}
