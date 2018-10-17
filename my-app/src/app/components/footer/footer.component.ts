import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerItems: NodeList;
  footerItemWidth: Number;
  footerItem: any;

  constructor() { }

  ngOnInit() {
    this.footerItems = document.querySelectorAll('.footerItem');
    this.footerItemWidth = 100 / this.footerItems.length;

    for(let i =0; i < this.footerItems.length; i++){
      this.footerItem = this.footerItems[i];
      
      this.footerItem.style.width = this.footerItemWidth + '%';
    }

  }

}
