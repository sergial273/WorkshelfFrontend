import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { NavbarregComponent } from "../shared/navbarreg/navbarreg.component";
import { NavbarsignedComponent } from '../shared/navbarsigned/navbarsigned.component';

@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [FooterComponent, NavbarregComponent, NavbarsignedComponent]
})
export class BookDetailsComponent {

}
