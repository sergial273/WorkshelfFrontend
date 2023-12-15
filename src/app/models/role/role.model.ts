import { User } from "../user/user.model";

export class Role {

    roleId!: number;
    roleName!: string;
    users!: User[];
}
