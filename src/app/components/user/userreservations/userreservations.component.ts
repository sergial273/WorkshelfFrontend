import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ReservationService } from '../../../_services/reservation/reservation.service';
import { UserService } from '../../../_services/user.service';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { DatePipe } from '@angular/common';
import { Reservation } from '../../../models/reservation/reservation.model';

@Component({
  selector: 'app-userreservations',
  standalone: true,
  imports: [FooterComponent, RouterLink, DatePipe],
  templateUrl: './userreservations.component.html',
  styleUrl: './userreservations.component.css'
})
export class UserreservationsComponent implements OnInit{

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, private userService: UserService, private tokenStorage: TokenStorageService){}

  ngOnInit(): void {

    const userId = this.tokenStorage.getUser();

    this.reservationService.getReservationsByUser(userId).subscribe(
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
