import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';

/** 
export const adminGuard: CanActivateFn = (route, state) => {
  

  const redirect = inject(Router);
  if (sessionStorage.getItem('role') !== 'ROLE_ADMIN') {
    redirect.navigate(['/']);
    return false;
  }
  return sessionStorage.getItem('role') === 'ROLE_ADMIN';
};*/

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private tokenStorageService: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.tokenStorageService.getRoles();
    if (user == null){
      this.router.navigate(['/']); 
      return false;
    }
    const role = JSON.parse(user)
    if (role.roleName!=="ADMIN") {
      this.router.navigate(['/']); 
      return false;
    }

    return true;
  }
}

