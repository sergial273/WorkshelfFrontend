import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarsignedComponent } from '../../shared/navbarsigned/navbarsigned.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-userbookshare',
  standalone: true,
  imports: [RouterLink, NavbarsignedComponent, FooterComponent],
  templateUrl: './userbookshare.component.html',
  styleUrl: './userbookshare.component.css'
})
export class UserbookshareComponent {

}
