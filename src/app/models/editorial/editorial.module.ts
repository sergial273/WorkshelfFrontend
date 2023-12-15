import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookModule } from '../book/book.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EditorialModule {
  id!: number;
  editorialName!: string;
  books!: BookModule[];
}
