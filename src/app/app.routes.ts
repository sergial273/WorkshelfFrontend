import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { UserreservationsComponent } from './components/user/userreservations/userreservations.component';
import { UserbookshareComponent } from './components/user/userbookshare/userbookshare.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { BookAddComponent } from './components/book/book-add/book-add.component';
import { EditorialAddComponent } from './components/editorial/editorial-add/editorial-add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';


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
        path:'editorial/add',
        component: EditorialAddComponent
    },
    {
        path:'admin',
        canActivate : [AdminGuard],
        component:AdminComponent
    },
    {
        path:'notfound',
        component:NotFoundComponent
    },
    {
        path:'**',
        redirectTo: '/notfound'
    },
];
