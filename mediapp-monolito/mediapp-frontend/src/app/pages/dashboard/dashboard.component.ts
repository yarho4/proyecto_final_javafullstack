import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  username: string;
  role: string;

  constructor(private menuService: MenuService){

  }

  ngOnInit(): void {
      console.log("dashboard oninit");
      const helper = new JwtHelperService();
      const token = sessionStorage.getItem(environment.TOKEN_NAME);
      const decodedToken = helper.decodeToken(token);
      
      console.log("dashboard token: " + decodedToken);

      this.username = decodedToken.sub;
      this.role = decodedToken.role;
      //this.username = decodedToken.preferred_username;

      //console.log(decodedToken);

      this.menuService.getMenusByUser(this.username).subscribe(data => this.menuService.setMenuChange(data));
  }

}
