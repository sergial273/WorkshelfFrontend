import { Reservation } from "../reservation/reservation.model";
import { User } from "../user/user.model";

export class Rating {

    id!: number;
    score!: number;
    comment!: string;
    user!: User;
    reservation!: Reservation;
}
