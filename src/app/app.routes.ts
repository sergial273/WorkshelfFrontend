import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { UserreservationsComponent } from './components/user/userreservations/userreservations.component';
import { UserbookshareComponent } from './components/user/userbookshare/userbookshare.component';
import { UseraddbookComponent } from './components/user/useraddbook/useraddbook.component';

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
        path:'details',
        component:BookDetailsComponent
    },
    {
        path:'user',
        component:UserdetailsComponent
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
        path:'useraddbook',
        component:UseraddbookComponent
    }
];
