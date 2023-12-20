import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Reservation } from '../../../models/reservation/reservation.model';
import { ReservationService } from '../../../_services/reservation/reservation.service';
import { UserService } from '../../../_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../models/book/book.model';
import { BookserviceService } from '../../../_services/book/bookservice.service';

@Component({
  selector: 'app-userbookshare',
  standalone: true,
  imports: [RouterLink, FooterComponent, DatePipe],
  templateUrl: './userbookshare.component.html',
  styleUrl: './userbookshare.component.css',
})
export class UserbookshareComponent implements OnInit {
  reservations: any;

  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private bookService: BookserviceService
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro de la ruta
    this.route.url.subscribe((segments) => {
      if (segments.some((segment) => segment.path === 'userbookshare')) {
        console.log('userbooklist');
        const userId = this.tokenStorage.getUser();
        this.reservationService.getBookSharing(userId).subscribe(
          (reservations: any) => {
            console.log(this.reservations);
            this.reservations = reservations;
          },
          (error) => {
            console.error('Error fetching user reservations: ', error);
          }
        );
      }

      if (segments.some((segment) => segment.path === 'book' || segment.path === 'reservations')) {
        const idFromRoute = this.route.snapshot.paramMap.get('id');
        const bookId: number = idFromRoute !== null ? parseInt(idFromRoute, 10) : 0;
        this.bookService.getBookById(bookId).subscribe(
          (book: any) => {
            this.reservationService.getReservationsByBook(book).subscribe(
              (reservations: any) => {
                this.reservations = reservations;
                console.log(reservations);
              },
              (error) => {
                console.error('Error fetching reservations for book: ', error);
              }
            );
          },
          (error) => {
            console.error('Error fetching book details: ', error);
          }
        );
      }
    });
  }
}
