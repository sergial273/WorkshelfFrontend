import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Book } from '../../../models/book/book.model';
import { Rating } from '../../../models/rating/rating.model';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { AuthService } from '../../../_services/auth.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { RatingService } from '../../../_services/rating/rating.service';
import { ReservationService } from '../../../_services/reservation/reservation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize, switchMap } from 'rxjs/operators';
import { Reservation } from '../../../models/reservation/reservation.model';


@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [FooterComponent, DatePipe, FormsModule]
})
export class BookDetailsComponent implements OnInit {

    book: Book = new Book();
    bookId: number = 0;
    bookDetails: any;
    ratings: Rating[] = []
    reservations: Reservation[] = [];
    isReservedByCurrentUser: boolean = false;
    isAvailable: boolean = true;
    isUserLogged: boolean = false;
    isUserBookOwner: boolean = false;
    rating: boolean = false; 
    stars: number = 1;
    comment: string = '';
    ratingToAdd: Rating = new Rating();

    constructor(
        private route: ActivatedRoute,
        private bookservice: BookserviceService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private ratingService: RatingService,
        private reservationService: ReservationService,
        private router: Router

    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.bookId = +params['id'];
            this.loadBookDetails();
            this.loadRatings();
        });
    }

    loadBookDetails(): void {
      this.bookservice.getBookById(this.bookId).pipe(
        switchMap((data) => {
          this.book = data;
          return this.reservationService.getReservationsByBookNotPaginated(this.book);
        }),
        finalize(() => {
          this.checkIfs();
        })
      ).subscribe(
        (reservations) => {
          this.reservations = reservations;
        },
        (error) => {
          console.error('Error fetching book details:', error);
        }
      );
    }

    findActiveReservation(): Reservation | undefined {
      const currentDate = new Date();
      
      const activeReservation = this.reservations.find(reservation => {
        return currentDate <= new Date(reservation.returnDate);
      });
  
      return activeReservation;
    }

    checkIfs(){
      this.isAvailable = this.book.reserved === 0;
          if (this.tokenStorage.getToken() !== null ) {
              this.isUserLogged = true;
              const currentUser = this.tokenStorage.getUser();
              const activeReservation = this.findActiveReservation()
              this.isReservedByCurrentUser = activeReservation?.user.userId === currentUser.userId;
              this.isUserBookOwner = this.book.user.userId == currentUser.userId;
          }
    }
    loadRatings(): void {
        this.ratingService.getRatingsByBookId(this.bookId).subscribe(
            (data: Rating[]) => {
                this.ratings = data;
            },
            (error) => {
                console.error('Error fetching ratings:', error);
            }
        );
    }

    getStarArray(score: number, totalStars: number): any[] {
      const fullStars = Math.floor(score);
      const starArray = Array(totalStars).fill('');
  
      return starArray;
  }

    createReservation(book: any) {
        this.reservationService.addReservation(book).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.error('Error al realizar la reserva:', error);
          }
        );
    }
    
    returnBook(book: any) {
        this.reservationService.returnBookReservation(book).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.error('Error al realizar la reserva:', error);
        }
        );
    }
    
    viewBookReservations(book: any) {
        this.reservationService.returnBookReservation(book);
        this.router.navigate([`book/${book.id}/reservations`]);
    }
  
    rateBook(book: any){
        this.rating = true;
    }

    addRating(){
        this.reservationService.getReserveByUserAndBook(this.book.id).pipe(
          switchMap((reservation) => {
            this.ratingToAdd.reservation = reservation;
        
            return this.ratingService.addRating(this.ratingToAdd);
          })
        ).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.error('Error al realizar la reserva:', error);
          });
    }
}