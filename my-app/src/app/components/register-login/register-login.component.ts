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
    this.authService.createUser(email, password).subscribe(res =>{
      console.log(res)
      this.formTitle = "LOGIN";
      this.login = true;
    });;

  }
 
  onLogin(email: string, password: string){
    if(!email && !password && !email.includes('@')){
      return;
    }
    this.authService.login(email, password).subscribe(response => {
      if(response) {
        this.logedIn.emit(true);
        const token = response.token;
        this.authService.setToken(token)
        this.saveAuthData(token);
      };

    });
        
  }

  private saveAuthData(token: string){
    localStorage.setItem('token', token);
  }

}
