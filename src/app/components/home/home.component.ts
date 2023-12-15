import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book/book.model';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

    currentPage: number = 0;
    pageSize: number = 8;

    books: Book[] = [];

    constructor(private bookservice: BookserviceService, private router: Router) { }

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

    goToBookDetails(id: number) {
        this.router.navigate(['/book/detail/', id]);
    }
}