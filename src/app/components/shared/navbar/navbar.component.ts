import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {TokenStorageService} from '../../../_services/token-storage.service'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user: any;

  constructor(public router: Router, private token:TokenStorageService) {
  }

  ngOnInit() {  }
  
  isRegistered():boolean{
    if(this.token.getToken() != null){
      this.user = this.token.getUser();
      return true;
    }
    else{
      return false;
    }
    
  }
  
  logout():void{
    this.user = null;
    this.token.signOut();
    this.router.navigate(['/']);
  }

  isAdmin():boolean{
    const user = this.token.getRoles();
    if (user != null){
      const role = JSON.parse(user)
      if (role.roleName==="ADMIN"){
        return true
      }
      else return false
    }
    return false
  }
}