import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorialModule } from '../editorial/editorial.module';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BookModule {
  id!: number;
  title!: string;
  image!: string;
  author!: string;
  bookingStatus!: string;
  reserved!: number;
  reservationDate!: Date;
  reservationDuration!: Date;
  user!: UserModule;
  editorial!: EditorialModule;
}
