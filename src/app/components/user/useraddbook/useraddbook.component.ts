import { Component } from '@angular/core';
import { NavbarsignedComponent } from '../../shared/navbarsigned/navbarsigned.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-useraddbook',
  standalone: true,
  imports: [NavbarsignedComponent, FooterComponent],
  templateUrl: './useraddbook.component.html',
  styleUrl: './useraddbook.component.css'
})
export class UseraddbookComponent {

}
