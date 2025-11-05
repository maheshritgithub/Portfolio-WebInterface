import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  constructor(private userDataService: UserDataService) { }

  /**
   * Checks if a user exists by their username.
   * @param username The username to validate.
   * @returns An Observable of boolean indicating if the user exists.
   */
  checkUserExists(username: string): Observable<boolean> {
    if (!username) {
      return of(false);
    }

    return this.userDataService.getUserDataByUsername(username).pipe(
      map(userData => {
        // If we get user data back, the user exists
        return !!userData && !!userData.id;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  /**
   * Validates if a user exists and returns the user data if found.
   * @param username The username to validate.
   * @returns An Observable of UserData or null if not found.
   */
  validateAndGetUser(username: string): Observable<any> {
    if (!username) {
      return of(null);
    }

    return this.userDataService.getUserDataByUsername(username).pipe(
      map(userData => userData || null),
      catchError(error => {
        return of(null);
      })
    );
  }

  /**
   * Checks if a username exists in the list of all users.
   * Useful for checking against the complete user database.
   * @param username The username to check.
   * @returns An Observable of boolean indicating if the user exists.
   */
  checkUserExistsInAllUsers(username: string): Observable<boolean> {
    if (!username) {
      return of(false);
    }

    return this.userDataService.getAllUsers().pipe(
      map(users => {
        return users.some(user => 
          user.username.toLowerCase() === username.toLowerCase()
        );
      }),
      catchError(error => {
        return of(false);
      })
    );
  }
}