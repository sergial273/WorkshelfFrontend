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
    isReservedByCurrentUser: boolean = true;
    isAvailable: boolean = true;

    rating: boolean = false; 
    stars: number = 1;
    comment: string = '';


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
        this.bookservice.getBookById(this.bookId).subscribe
            (data => {
                this.book = data;
                //Reserved available = 0 ?
                this.isAvailable = this.book.reserved === 0;
                //if (this.tokenStorage.isAuthenticated()) {
                //    const currentUser = this.tokenStorage.getUser();
                //    this.isReservedByCurrentUser = this.book.user?.userId === currentUser.id;
                //}
            },
                (error) => {
                    console.error('Error fetching book details:', error);
                }
            );
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

    getStarArray(score: number): any[] {
        const fullStars = Math.floor(score);
        const starArray = Array(fullStars).fill('full-star');
        
        return starArray;
    }

    createReservation(book: any) {
        this.reservationService.addReservation(book).subscribe(
          (response) => {
            console.log('Reserva exitosa:', response);
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
            console.log('Reserva exitosa:', response);
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

    }
}