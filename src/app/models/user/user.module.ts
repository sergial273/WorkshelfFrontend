import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleModule } from '../role/role.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UserModule { 
  userId!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: RoleModule;
}
