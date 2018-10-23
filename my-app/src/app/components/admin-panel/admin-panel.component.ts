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
    if(this.auth){
      this.btnHolder = document.getElementById('btnHolder');
      this.windowHeight = window.innerHeight;
      this.btnHolder.style.marginTop = this.windowHeight / 3.2 + 'px';
    }

    this.authService.getTokenStatus().subscribe(res => {
      this.auth = res;
    });
    
  }

  logedIn(logedIn){
    this.auth = logedIn;
    console.log(logedIn);

  }

}
