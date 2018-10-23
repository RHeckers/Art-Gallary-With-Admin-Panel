import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  btnHolder: HTMLElement;
  windowHeight: number;
  auth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTokenStatus().subscribe(res => {
      this.auth = res;
    }); 
  }

  ngAfterViewChecked(){
    if(this.auth){
      this.placeBtns();
    }
  }

  placeBtns(){
    this.btnHolder = document.getElementById('btnHolder');
    this.windowHeight = window.innerHeight;
    this.btnHolder.style.marginTop = this.windowHeight / 3.2 + 'px';
  }

  logedIn(logedIn){
    this.auth = logedIn;
    console.log(logedIn);

  }

}
