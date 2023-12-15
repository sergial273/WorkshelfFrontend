import { FooterComponent } from '../shared/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles;
      this.tokenStorage.getUser().roles;
    }
  }

  async onSubmit(): Promise<void> {
    const { username, password } = this.form;
    const data: any = await this.authService.login(username, password).toPromise();

    try {
        this.tokenStorage.saveToken(data);
        await this.tokenStorage.saveUser(username);
        this.roles = this.tokenStorage.getUser().role;
        this.tokenStorage.saveRoles(this.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      } catch (err: any) {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
