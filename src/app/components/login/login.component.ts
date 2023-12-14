import { Component } from '@angular/core';
import { NavbarlogComponent } from '../shared/navbarlog/navbarlog.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarlogComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
