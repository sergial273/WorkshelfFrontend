import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';

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
        path:'signin',
        component:SignInComponent
    }
];
