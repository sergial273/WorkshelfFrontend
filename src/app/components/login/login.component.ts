import { FooterComponent } from '../shared/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };

  invis: boolean = false;
  invisLogin: boolean = false;
  loading: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessageReg = '';
  errorMessage = '';
  roles: string[] = [];

  formReg: any = {
    username: null,
    email: null,
    password: null,
  };

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = false;

    if (this.tokenStorage.getToken() != null) {
      this.isLoggedIn = true;
      this.roles;
      this.tokenStorage.getUser().roles;
    }
  }

  async onSubmitLogin(): Promise<void> {
    if (!this.form.username || !this.form.password) {
      this.invisLogin = true;
      return;
    }

    const { username, password } = this.form;

    setTimeout(async () => {
      try {
        const data: any = await this.authService
          .login(username, password)
          .toPromise();
        this.isLoggedIn = true;
        this.tokenStorage.saveToken(data);

        if (this.tokenStorage.getToken() == null) {
          this.isLoginFailed = false;
        }
        await this.tokenStorage.saveUser(username);
        this.roles = this.tokenStorage.getUser().role;
        this.tokenStorage.saveRoles(this.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      } catch (error) {
        this.isLoginFailed = true;
      } finally {
        this.loading = false;
      }
    }, 1000);
    this.loading = true;

    try {
    } catch (err: any) {}
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmitReg(): void {
    if (
      !this.formReg.username ||
      !this.formReg.email ||
      !this.formReg.password
    ) {
      this.invis = true;
      return;
    }

    const { username, email, password } = this.formReg;

    this.loading = true;

    this.authService
      .register(username, email, password)
      .subscribe(
        (data: any) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        (err: any) => {
          this.errorMessageReg = err.error.message;
          this.isSignUpFailed = true;
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
}
