import { Role } from "../role/role.model";

export class User {

    userId!: number;
    username!: string;
    email!: string;
    password!: string;
    role!: Role;
}
