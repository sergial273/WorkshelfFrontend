import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { BookserviceService } from '../../_services/book/bookservice.service';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})
export class BookAddComponent {

  form: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookserviceService
  ) {
    this.form = this.formBuilder.group({
      title: [null],
      author: [null],
      bookingStatus: [null],
      reserved: [null],
      reservationDate: [null],
      reservationDuration: [null],
      user: [null],
      editorial: [null]
    });
  }

  onSubmit() {
    console.log("onsubmit")
      const formData = this.form.value;
      console.log(formData)
      this.bookService.addBook(formData).subscribe(response => {
        console.log('Result:', response);
        this.router.navigate(['/']);
      });
    
  }
}


