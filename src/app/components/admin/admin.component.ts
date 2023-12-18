import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { Book } from '../../models/book/book.model';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../_services/token-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { ReservationService } from '../../_services/reservation/reservation.service';
import { Reservation } from '../../models/reservation/reservation.model';
import { UserService } from '../../_services/user.service';
import { User } from '../../models/user/user.model';
import { Editorial } from '../../models/editorial/editorial.model';
import { EditorialService } from '../../_services/editorial/editorial.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  loading = false;
  activeButton = 1;
  books: Book[] = [];
  reservations: Reservation[] = [];
  users: User[] = [];
  editorials: Editorial[] = [];
  currentPage: number = 0;
  pageSize: number = 8;

  @ViewChild('apuntar1') apuntar1!: ElementRef;
  @ViewChild('apuntar2') apuntar2!: ElementRef;
  @ViewChild('apuntar3') apuntar3!: ElementRef;
  @ViewChild('apuntar4') apuntar4!: ElementRef;

  constructor(
    private bookservice: BookserviceService,
    private router: Router,
    private token: TokenStorageService,
    private reservationService: ReservationService,
    private userService: UserService,
    private ediorialService: EditorialService
  ) {}

  ngOnInit() {
    this.test(1);
  }

  test(id: number) {
    if (id !== this.activeButton) {
      this.currentPage = 0;
      this.activeButton = id;
    }

    if (this.activeButton === 1) {
      this.getAllBooks();
    }
    else if (this.activeButton === 2) {
      this.getAllReservations();
    }
    else if (this.activeButton === 3) {
      this.getAllUser();
    }
    else if (this.activeButton === 4) {
      this.getAllEditorials();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      if (this.activeButton === 1) {
        this.getAllBooks();
      }
      else if (this.activeButton === 2) {
        this.getAllReservations();
      }
      else if (this.activeButton === 3) {
        this.getAllUser();
      }
      else if (this.activeButton === 4) {
        this.getAllEditorials();
      }
    }
  }

  nextPage() {
    if (this.activeButton === 1) {
      if (this.books.length === this.pageSize){
        this.currentPage++;
        this.getAllBooks();
      }
    }
    else if(this.activeButton === 2){
      if (this.reservations.length === this.pageSize){
        this.currentPage++;
        this.getAllReservations();
      }
    }
    else if(this.activeButton === 3){
      if (this.users.length === this.pageSize){
        this.currentPage++;
        this.getAllUser();
      }
    }
    else if(this.activeButton === 4){
      if (this.editorials.length === this.pageSize){
        this.currentPage++;
        this.getAllEditorials();
      }
    }
  }

  //Book methods
  getAllBooks() {
    this.bookservice
      .getAllBooks(this.currentPage, this.pageSize)
      .subscribe((books) => {
        this.books = books;
      });
  }

  goToBookDetails(id: number) {
    this.router.navigate(['/book/detail/', id]);
  }

  async deleteBook(id: number, status: string) {
    if (status === 'Available') {
      this.loading = true;
      const tokent = this.token.getToken();
      const headers = new HttpHeaders({
        Authorization: `Bearer ${tokent}`,
      });

      this.bookservice.deleteBook(id, headers);
      await new Promise((f) => setTimeout(f, 1000));
      window.location.reload();
    } else {
      alert("Can't delete a reserved book!");
    }
  }

  //Reservation Methods
  async getAllReservations() {
    const tokent = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokent}`,
    });
    this.reservationService
      .getAllResrevation(this.currentPage, this.pageSize, headers)
      .subscribe((reservations) => {
        this.reservations = reservations;
        console.log(this.reservations)
      });
    
  }

  async deleteReservation(id: number) {
    this.loading = true;
    const tokent = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokent}`,
    });

    this.reservationService.deleteReservation(id, headers);
    await new Promise((f) => setTimeout(f, 1000));
    window.location.reload();
  }


  //User Methods
  async getAllUser() {
    const tokent = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokent}`,
    });
    this.userService
      .getAllUser(this.currentPage, this.pageSize, headers)
      .subscribe((user) => {
        this.users = user;
      });
    
  }

  async deleteUser(id: number) {
    this.loading = true;
    const tokent = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokent}`,
    });

    this.userService.deleteUser(id, headers);
    await new Promise((f) => setTimeout(f, 1000));
    window.location.reload();
  }

  //Editorials Methods
  async getAllEditorials() {
    this.ediorialService
      .getPaginatedEditorials(this.currentPage, this.pageSize)
      .subscribe((edit) => {
        this.editorials = edit;
      });
    
  }

  async deleteEditorial(id: number) {
    this.loading = true;
    const tokent = this.token.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${tokent}`,
    });

    this.userService.deleteUser(id, headers);
    await new Promise((f) => setTimeout(f, 1000));
    window.location.reload();
  }

}
