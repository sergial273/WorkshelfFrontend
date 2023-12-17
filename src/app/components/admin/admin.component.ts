import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { Book } from '../../models/book/book.model';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})



export class AdminComponent implements OnInit {
  loading = false;
  activeButton = 1;
  books: Book[] = [];
  currentPage: number = 0;
  pageSize: number = 8;

  @ViewChild('apuntar1') apuntar1!: ElementRef;
  @ViewChild('apuntar2') apuntar2!: ElementRef;
  @ViewChild('apuntar3') apuntar3!: ElementRef;
  @ViewChild('apuntar4') apuntar4!: ElementRef;
  
  constructor(private bookservice: BookserviceService, private router: Router, private token: TokenStorageService){
  }

  ngOnInit() {
    this.test(1);
  }

  test(id:number){
    if(id !== this.activeButton){
      this.currentPage = 0;
      this.activeButton = id;
    }
    
    if(this.activeButton === 1){
      this.getAllBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
        this.currentPage--;
        if(this.activeButton === 1){
          this.getAllBooks();
        }
    }
  }

  nextPage() {
      if (this.books.length === this.pageSize) {
          this.currentPage++;
          if(this.activeButton === 1){
            this.getAllBooks();
          }
          
      }
  }

  //Book methods
  getAllBooks() {
    this.bookservice.getAllBooks(this.currentPage, this.pageSize).subscribe((books) => {
        this.books = books;
    });
  }

  goToBookDetails(id: number) {
    this.router.navigate(['/book/detail/', id]);
  }

  async deleteBook(id:number, status:string){
    if(status === 'Available'){
      this.loading = true;
      const tokent = this.token.getToken();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${tokent}`
      });

      this.bookservice.deleteBook(id, headers);
      await new Promise(f => setTimeout(f, 1000));
      window.location.reload();
    }
    else{
      alert("Can't delete a reserved book!");
    }
  }

  //Reservation Methods
  
}
