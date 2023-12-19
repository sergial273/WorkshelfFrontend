import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookserviceService } from '../../_services/book/bookservice.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book/book.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterLink, DatePipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

    books: Book[] = [];

    constructor(private bookservice: BookserviceService, private router: Router) { }

    ngOnInit(): void {
    }

}