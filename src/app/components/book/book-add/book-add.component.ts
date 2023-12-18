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

  form: FormGroup = this.formBuilder.group({
    title: [null],
    image: [null],
    author: [null],
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
    const formData = this.form.value;
    const editorialId = formData.editorial;
    console.log(editorialId)
    console.log(typeof(formData.editorialId))

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