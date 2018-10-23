import { AuthService } from './../../services/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  formTitle: string;
  login: boolean;

  @Output() logedIn = new EventEmitter<boolean>();


  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getStatus().subscribe(users => {
      console.log(users.length)
      if(users.length > 0){
        this.formTitle = "LOGIN";
        this.login = true;
      }else{ 
        this.formTitle = "REGISTER";
        this.login = false;
      }
    });
  }

  onSignUp(email: string, password: string){
    if(!email && !password && !email.includes('@')){
      return;
    }
    this.authService.createUser(email, password);
  }
 
  onLogin(email: string, password: string){
    if(!email && !password && !email.includes('@')){
      return;
    }
    this.authService.login(email, password).subscribe(response => {
      if(response) this.logedIn.emit(true);
    });
        
  }

}
