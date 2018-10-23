import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  btnHolder: HTMLElement;
  windowHeight: number;
  auth: boolean;

  constructor() { }

  ngOnInit() {
    if(this.auth){
      this.btnHolder = document.getElementById('btnHolder');
      this.windowHeight = window.innerHeight;
      this.btnHolder.style.marginTop = this.windowHeight / 3.2 + 'px';
    }
    
  }

  logedIn(logedIn){
    this.auth = logedIn;
    console.log(logedIn);

  }

}
