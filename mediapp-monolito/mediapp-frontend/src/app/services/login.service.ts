import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

interface ILoginRequest{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/login`;
  //private url: string = `${environment.UAA_HOST}/realms/mediapp/protocol/openid-connect/token`;  //KeyCloak

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string){
    const body: ILoginRequest = { username, password};
    console.log("login username: "+ username);
    return this.http.post<any>(this.url, body);
  }

  /*login(username: string, password: string){
    //KeyCloak
    const body = `client_id=mediapp-backend&client_secret=IqXuZZTp41C9PPlJAWGeBnQj00dXJVTH&grant_type=password&username=${username}&password=${password}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    });
  }*/

  logout(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isLogged(){
    const token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  //send mail from backend
  sendMail(username: string) {
    return this.http.post<number>(
      `${environment.HOST}/mail/sendMail`,
      username,
      {
        headers: new HttpHeaders().set('Content-Type', 'text/plain'),
      }
    );
  }

  checkTokenReset(random: string) {
    return this.http.get<number>(
      `${environment.HOST}/mail/reset/check/${random}`
    );
  }

  reset(random: string, newPassword: string) {
    return this.http.post(
      `${environment.HOST}/mail/reset/${random}`,
      newPassword,
      {
        headers: new HttpHeaders().set('Content-Type', 'text/plain'),
      }
    );
  }
}
