import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { UserService } from '../../../_services/user.service';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-userbooklist',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './userbooklist.component.html',
  styleUrl: './userbooklist.component.css'
})
export class UserbooklistComponent implements OnInit{
  loading = true;
  books: Book[] = [];

  constructor(
    private userService: UserService, 
    private bookService: BookserviceService, 
    private tokenStorage: TokenStorageService,
    private token: TokenStorageService,
    private router: Router){}

  ngOnInit(): void {
    const userId = this.tokenStorage.getUser();
    this.bookService.getBookByUserId(userId).subscribe(
      (books: any) => {
        this.books = books;
        console.log(this.books);
      },
      (error) => {
        console.error('Error fetching user books: ', error);
      }
    );
  }

  editBook(bookId: number) {
    const updatedRoute = `/book/update/${bookId}`;
    this.router.navigate([updatedRoute]);
  }

  detailBook(bookId: number) {
    const updatedRoute = `/details/${bookId}`;
    this.router.navigate([updatedRoute]);
  }

  async deleteBook(book: any) {
    console.log(book)
    if (book.reserved === 0) {
      this.loading = true;
      const tokent = this.token.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokent}`,
      });

      this.bookService.deleteBook(book.id, headers);
      await new Promise((f) => setTimeout(f, 1000));
      window.location.reload();
    } else {
      alert("Can't delete a reserved book!");
    }
  }
}