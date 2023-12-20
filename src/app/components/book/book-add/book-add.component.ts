import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { Editorial } from '../../../models/editorial/editorial.model';
import { EditorialService } from '../../../_services/editorial/editorial.service';
import { USER_KEY } from '../../../api-constants';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.css'
})

export class BookAddComponent implements OnInit {
  editorials: Editorial[] = [];

  invis: boolean = false;

  form: FormGroup = this.formBuilder.group({
    title: [null],
    image: [null],
    author: [null],
    genre: [null],
    reserved: [0],
    reservationDuration: [0],
    user: [this.tokenService.getUser()],
    editorial: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookService: BookserviceService,
    private editorialService: EditorialService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      author: [null, Validators.required],
      genre: [null, Validators.required],
      reserved: [0],
      reservationDuration: [0, Validators.required],
      user: [this.tokenService.getUser()],
      editorial: [null, Validators.required],
    });

    this.editorialService.getAllEditorials().subscribe(
      (editorials: Editorial[]) => {
        this.editorials = editorials;
        console.log('Editorials:', editorials);
      },
      (error: any) => {
        console.error('Error fetching editorials:', error);
      }
    );
  }

  onSubmit() {
    const isFormEmpty = Object.values(this.form.value).some(value => value === null || value === '');

    if (isFormEmpty) {
      console.log('All fields are required');
      this.invis = true;
      return;
    }
    const formData = this.form.value;
    const editorialId = formData.editorial;

    this.editorialService.getEditorialByIdString(editorialId).subscribe(
      (editorial: any) => {
        formData.editorial = editorial;
        console.log(formData)
        this.bookService.addBook(formData).subscribe(response => {
          this.router.navigate(['/']);
        });
      },
      (error: any) => {
        console.error('Error fetching editorial:', error);
      }
    );
  }
}