import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { Editorial } from '../../../models/editorial/editorial.model';
import { EditorialService } from '../../../_services/editorial/editorial.service';
import { TokenStorageService } from '../../../_services/token-storage.service';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})
export class BookUpdateComponent implements OnInit {
  editorials: Editorial[] = [];
  selectedEditorialId: number = 0;
  book: any;

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
    private route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.getBookDetails(bookId);
    });
  }

  private initializeForm() {
    const selectedEditorialId = this.book.editorial.id;
    this.form.patchValue({
      title: this.book.title || '', 
      image: this.book.image || '',
      author: this.book.author || '',
      genre: this.book.genre || '',
      reserved: this.book.reserved || '',
      reservationDuration: this.book.reservationDuration || '',
      user: this.book.user || '',
      editorial: selectedEditorialId || '',
    });
  }

  getBookDetails(bookId: number) {
    this.bookService.getBookById(bookId).subscribe((data: any) => {
      this.book = data;

      const currentUser = this.tokenService.getUser();

      if(this.book.user.userId !== currentUser.userId){
        this.router.navigate(['/book/list']);
      }
      this.initializeForm();
    },
    (error: any) => {
      this.router.navigate(['/book/list']);
    });
  }

  onSubmit() {
    console.log("onsubmit");
    const formData = this.form.value;
    const editorialId = formData.editorial;

    this.editorialService.getEditorialByIdString(editorialId).subscribe(
      (editorial: any) => {
        formData.editorial = editorial;
        console.log(formData)
        this.bookService.updateBook(this.book.id, formData).subscribe(response => {
          this.router.navigate(['/']);
        });
      },
      (error: any) => {
        console.error('Error fetching editorial:', error);
      }
    );
  }
}
