import { Editorial } from "../editorial/editorial.model";
import { User } from "../user/user.model";

export class Book {

    id!: number;
    title!: string;
    image!: string;
    author!: string;
    bookingStatus!: string;
    reserved!: number;
    reservationDate!: Date;
    reservationDuration!: Date;
    user!: User;
    editorial!: Editorial;
}
