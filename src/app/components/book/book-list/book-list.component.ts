import { Component, OnInit } from '@angular/core';
import { Book } from '../../../models/book/book.model';
import { BookserviceService } from '../../../_services/book/bookservice.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {

  currentPage: number = 0;
  pageSize: number = 10;

  books: Book[] = [];

  genres: string[] = ['Adventure', 'Mystery', 'Science Fiction', 'Romance', 'Classic', 'Magical Realism', 'Thriller', 'Horror']
  selectedGenres: string[] = [];

  form: FormGroup; 

  constructor(private bookservice: BookserviceService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute,) {
    this.form = this.formBuilder.group({
      searchTerm: [null],
    });
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      if (params.has('search')) {
        if(params.get('search') === 'null'){
          this.getAllBooks();
        }
        else{
          const search = params.get('search');
          this.form.patchValue({
            searchTerm: search,
          });
          this.onSubmit();
        }
      }
      else{
        this.getAllBooks();
      }
    });
    
  }

  getAllBooks() {
    this.bookservice.getAllBooks(this.currentPage, this.pageSize).subscribe((books) => {
      this.books = books;
    });
  }

  getBooksByGenre() {
    this.bookservice.getBooksByGenre(this.selectedGenres, this.currentPage, this.pageSize).subscribe((books) => {
      this.books = books;
      console.log(this.books)
    });
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      if(this.selectedGenres.length === 0){
        this.getAllBooks();
      }
      else{
        this.getBooksByGenre();
      }
    }
  }

  nextPage() {
    if (this.books.length === this.pageSize) {
      this.currentPage++;
      if(this.selectedGenres.length === 0){
        this.getAllBooks();
      }
      else{
        this.getBooksByGenre();
      }
    }
  }

  goToBookDetails(id: number) {
    this.router.navigate(['/book/detail/', id]);
  }

  filterBooks(genre:string) {
    this.form.reset({
      searchTerm: ''
    });
    this.currentPage = 0;
    
    if(this.selectedGenres.includes(genre)){
      this.selectedGenres = this.selectedGenres.filter(item => item !== genre);
    }
    else{
      this.selectedGenres.push(genre)
    }

    if(this.selectedGenres.length === 0){
      this.getAllBooks();
    }
    else{
      this.getBooksByGenre();
    }
  }

  onSubmit(){
    this.currentPage = 0;
    const formData = this.form.value;
    const searchTermValue = formData.searchTerm;

    this.uncheckAllCheckboxes();

    this.bookservice.getBooksBySearchTitle(searchTermValue, this.currentPage, this.pageSize).subscribe((books) => {
      this.books = books;
    },
    (error) => {
      this.books = [];
    });
  }

  uncheckAllCheckboxes() {
    this.genres.forEach(genre => {
      const checkbox = document.getElementById('chk' + genre) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    });
  
    this.selectedGenres = [];
  }
}
