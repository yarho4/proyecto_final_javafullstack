import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { environment } from '../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ){}

  login(){
    this.loginService.login(this.username, this.password).subscribe(data => {
      console.log("login data: " + data);
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      console.log("login token: " + data.access_token);
      this.router.navigate(['pages/dashboard'])
    });
  }


}
