import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbarreg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbarreg.component.html',
  styleUrl: './navbarreg.component.css'
})
export class NavbarregComponent implements OnInit{

  items: any[] | undefined;

  ngOnInit() {

  }
}