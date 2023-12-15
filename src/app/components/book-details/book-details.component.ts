import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [FooterComponent]
})
export class BookDetailsComponent {

}
