import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { BookModule } from '../../models/book/book.module';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, BookModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

    currentPage: number = 0;
    pageSize: number = 8;

    books: BookModule[] = [];

    constructor(private bookservice: BookserviceService) { }

    ngOnInit(): void {
        this.getAllBooks();
        console.log(this.books);
    }
    getAllBooks() {
        this.bookservice.getBooks(this.currentPage, this.pageSize).subscribe((books) => {
            this.books = books;
        });
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.getAllBooks();
        }
    }

    nextPage() {
        if (this.books.length === this.pageSize) {
            this.currentPage++;
            this.getAllBooks();
        }
    }
}