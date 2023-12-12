import { Component } from '@angular/core';
import { NavbarregComponent } from '../shared/navbarreg/navbarreg.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [NavbarregComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

}
