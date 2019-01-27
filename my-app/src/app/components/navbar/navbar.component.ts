import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  auth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getTokenStatus().subscribe(res => {
      this.auth = res;     
    }); 
  }
  public goBack() {
    window.history.back();
  }
}
