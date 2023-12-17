import { Component, OnInit, Pipe } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";
import { BookserviceService } from '../../_services/book/bookservice.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book/book.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Rating } from '../../models/rating/rating.model';
import { RatingService } from '../../_services/rating/rating.service';

@Component({
    selector: 'app-book-details',
    standalone: true,
    templateUrl: './book-details.component.html',
    styleUrl: './book-details.component.css',
    imports: [FooterComponent, DatePipe]
})
export class BookDetailsComponent implements OnInit {

    book: Book = new Book();
    bookId: number = 0;
    bookDetails: any;
    isAvailable: boolean = false;
    isReservedByCurrentUser: boolean = false;
    ratings: Rating[] = []

    constructor(
        private route: ActivatedRoute,
        private bookservice: BookserviceService,
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private ratingService: RatingService

    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.bookId = +params['id'];
            console.log(this.loadBookDetails);
            console.log(this.loadRatings);
            this.loadBookDetails();
            this.loadRatings();
        });
    }

    loadBookDetails(): void {
        this.bookservice.getBookById(this.bookId).subscribe
            (data => {
                this.book = data;
                this.isAvailable = this.book.bookingStatus === 'Available';
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
                console.log("loading ratings from book" + this.bookId);
                console.log("loading data from book" + data);
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
}
