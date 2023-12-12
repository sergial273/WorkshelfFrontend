import { Component } from '@angular/core';
import { NavbarlogComponent } from '../shared/navbarlog/navbarlog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarlogComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
