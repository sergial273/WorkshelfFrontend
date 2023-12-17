import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserreservationsComponent } from './components/user/userreservations/userreservations.component';
import { UserbookshareComponent } from './components/user/userbookshare/userbookshare.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookAddComponent } from './book/book-add/book-add.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'registration',
        component:RegistrationComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'details/:id',
        component:BookDetailsComponent
    },
    {
        path:'user',
        component:UserDetailsComponent
    },
    {
        path:'userreservations',
        component:UserreservationsComponent
    },
    {
        path:'userbookshare',
        component:UserbookshareComponent
    },
    {
        path:'book/add',
        component: BookAddComponent
    },
    {
        path:'admin',
        component:AdminComponent
    }
];
