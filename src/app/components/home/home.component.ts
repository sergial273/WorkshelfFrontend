import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book/book.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterLink, DatePipe, FormsModule, ReactiveFormsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

    books: Book[] = [];

    form: FormGroup; 

    constructor(private bookservice: BookserviceService, private router: Router, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            searchTerm: [null],
          });
     }

    ngOnInit(): void {
    }

    onSubmit(){
        const formData = this.form.value;
        const searchTermValue = formData.searchTerm;
        
        this.router.navigateByUrl('/book/list/'+searchTermValue);
        
      }

}