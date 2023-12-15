import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarsignedComponent } from '../../shared/navbarsigned/navbarsigned.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink, NavbarsignedComponent, FooterComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  currentUser: any;
  
  constructor(private token: TokenStorageService) { 
  }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.token.getUser())
  }
}
