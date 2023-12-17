import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import { TokenStorageService } from '../../../_services/token-storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [RouterLink, FooterComponent, ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})

export class UserDetailsComponent implements OnInit {
  currentUser: any;
  myForm!: FormGroup;
  
  constructor(
    private token: TokenStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.myForm = this.formBuilder.group({
      username: this.currentUser.username, 
      email: this.currentUser.email,
      password: this.currentUser.password
    });
    console.log(JSON.stringify(this.token.getUser()))
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.userService.updateUser(this.currentUser.id, formData).subscribe(response => {
        this.router.navigate(['/']);
      });
    }
  }
}
