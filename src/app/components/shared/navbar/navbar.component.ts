import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  items: any[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/registration'
      },
      {
        label: 'Login',
        icon: 'pi pi-user',
        routerLink: '/login'
      }
    ];
  }
}