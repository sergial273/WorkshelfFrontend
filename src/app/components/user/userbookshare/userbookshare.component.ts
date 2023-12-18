import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Reservation } from '../../../models/reservation/reservation.model';
import { ReservationService } from '../../../_services/reservation/reservation.service';
import { UserService } from '../../../_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-userbookshare',
  standalone: true,
  imports: [RouterLink, FooterComponent, DatePipe],
  templateUrl: './userbookshare.component.html',
  styleUrl: './userbookshare.component.css'
})
export class UserbookshareComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

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

}
