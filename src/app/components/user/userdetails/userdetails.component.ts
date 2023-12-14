import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarsignedComponent } from '../../shared/navbarsigned/navbarsigned.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [RouterLink, NavbarsignedComponent, FooterComponent],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {

}
