import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarlog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbarlog.component.html',
  styleUrl: './navbarlog.component.css'
})
export class NavbarlogComponent implements OnInit {

  ngOnInit() {

  }
}