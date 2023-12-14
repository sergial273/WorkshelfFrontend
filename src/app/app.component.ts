import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

private roles: string[] = [];
isLoggedIn = false;
username?: string;
// showAdminBoard = false;
// showModeratorBoard = false;

constructor(private tokenStorageService: TokenStorageService) { }

ngOnInit(): void {
  this.isLoggedIn = !!this.tokenStorageService.getToken();

  if (this.isLoggedIn) {
    const user  = this.tokenStorageService.getUser(); 
    this.roles = user.roles;
    this.username = user.username;
    // this.showAdminBoard this.roles.includes("ROLE_ADMIN"); 
    // this.showModeratorBoard this.roles.includes('ROLE_MODERATOR");
  }
  
}


  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}