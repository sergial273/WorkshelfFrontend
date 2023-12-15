import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userreservations',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './userreservations.component.html',
  styleUrl: './userreservations.component.css'
})
export class UserreservationsComponent {

}
