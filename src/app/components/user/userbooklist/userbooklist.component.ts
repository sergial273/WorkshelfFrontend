import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { UserService } from '../../../_services/user.service';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-userbooklist',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './userbooklist.component.html',
  styleUrl: './userbooklist.component.css'
})
export class UserbooklistComponent implements OnInit{

  books: Book[] = [];

  constructor(private userService: UserService, private bookService: BookserviceService, private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
  
    const userId = this.tokenStorage.getUser();
    
    this.bookService.getBookByUserId(userId).subscribe(
      (books: any) => {
        console.log(this.books);
        this.books = books;
      },
      (error) => {
        console.error('Error fetching user books: ', error);
      }
    );
  }

}