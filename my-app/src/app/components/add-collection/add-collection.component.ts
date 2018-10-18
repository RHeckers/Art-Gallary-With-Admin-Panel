import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css']
})
export class AddCollectionComponent implements OnInit {

  imgInput: HTMLElement;
  collectionTitle: string;
  imagePreviews: Array<any> = [];

  constructor() { }

  ngOnInit() {
    document.getElementById('footer').style.display = 'none';

    this.imgInput = document.getElementById('imgInput');
  }

  uploadImg(e){
    console.log(e);

    const uploadedImg = e.target.files[0];
    console.log(uploadedImg);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.unshift(reader.result) ;
      console.log(this.imagePreviews);
    };
    reader.readAsDataURL(uploadedImg);
    
  }

}
