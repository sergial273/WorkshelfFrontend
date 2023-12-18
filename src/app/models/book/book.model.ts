import { Editorial } from "../editorial/editorial.model";
import { Reservation } from "../reservation/reservation.model";
import { User } from "../user/user.model";

export class Book {

    id!: number;
    title!: string;
    image!: string;
    author!: string;
    reserved!: number;
    reservationDuration!: Date;
    user!: User;
    editorial!: Editorial;
    reservation!: Reservation;
}
