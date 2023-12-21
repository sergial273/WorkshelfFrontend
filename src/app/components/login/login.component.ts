import { FooterComponent } from '../shared/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

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

  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  formReg: any = {
    username: null,
    email: null,
    password: null,
  };

  invis: boolean = false;
  invisLogin: boolean = false;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessageReg = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
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

    this.loading = true;
    const { username, password } = this.form;
    const data: any = await this.authService.login(username, password).toPromise();

    setTimeout(async () => {
      try {
        this.tokenStorage.saveToken(data);
        console.log("printing", this.loading)
        await this.tokenStorage.saveUser(username);
        this.roles = this.tokenStorage.getUser().role;
        this.tokenStorage.saveRoles(this.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      } catch (err: any) {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      } finally {
        this.loading = false;
      }
    }, 1000);
  }

  reloadPage(): void {
    window.location.reload();
  }

  onSubmitReg(): void {

    if (!this.formReg.username || !this.formReg.email || !this.formReg.password) {
      this.invis = true;
      return;
    }

    const { username, email, password } = this.formReg;

    this.loading = true;

    this.authService.register(username, email, password).subscribe(
      (data: any) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      (err: any) => {
        this.errorMessageReg = err.error.message;
        this.isSignUpFailed = true;
      }
    ).add(() => {
      this.loading = false;
    });
  }
}
