import { Book } from "../book/book.model";
import { Rating } from "../rating/rating.model";
import { User } from "../user/user.model";

export class Reservation {

    id!: number;
    requestDate!: Date;
    returnDate!: Date;
    user!: User;
    book!: Book;
    ratings?: Rating[];
}
