import { Component, OnInit } from '@angular/core';
import { NavbarregComponent } from '../shared/navbarreg/navbarreg.component';

import { AuthService } from '../../_services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [NavbarregComponent, FormsModule, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})

export class RegistrationComponent {

  form: any = {
    username: null,
    email: null,
    password: null,
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}


  onSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe(
      (data: any) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
