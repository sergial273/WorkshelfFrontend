import { Book } from "../book/book.model";

export class Editorial {

    id!: number;
    editorialName!: string;
    books!: Book[];
}
