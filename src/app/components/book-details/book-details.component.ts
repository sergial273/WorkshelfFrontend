import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { BookserviceService } from '../../_services/book/bookservice.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book/book.model';

@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [FooterComponent]
})
export class BookDetailsComponent implements OnInit {

    book: Book = new Book();
    bookId: number = 0;
    bookDetails: any;

    constructor(
        private route: ActivatedRoute,
        private bookservice: BookserviceService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.bookId = +params['id'];
            console.log(this.bookId);
            this.loadBookDetails();
        });
    }

    loadBookDetails(): void {
        this.bookservice.getBookById(this.bookId).subscribe
        (data => {
            this.book = data;
            console.log(this.book);
        },
        (error) => {
            console.error('Error fetching character details:', error);
            }
        );
    }
}
