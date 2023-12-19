import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  currentPage: number = 0;
  pageSize: number = 10;

  books: Book[] = [];

  constructor(private bookservice: BookserviceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookservice.getAllBooks(this.currentPage, this.pageSize).subscribe((books) => {
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
