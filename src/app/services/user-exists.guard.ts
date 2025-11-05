import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserValidationService } from '../services/user-validation.service';

@Injectable({
  providedIn: 'root'
})
export class UserExistsGuard implements CanActivate {

  constructor(
    private userValidationService: UserValidationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const username = route.paramMap.get('username');

    if (!username) {
      this.router.navigate(['/not found']).then(() => false);
    }

    return this.userValidationService.checkUserExists(username).pipe(
      map(exists => {
        if (exists) {
          return true;
        } else {
          return this.router.createUrlTree(['/not found']);
        }
      })
    );
  }
}