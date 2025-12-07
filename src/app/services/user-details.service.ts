import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface UserDetails {
  userId: string;
  about: string;
  skillSet: string[];
  profileImage: string; 
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = `${environment.apiUrl}/UserDetails`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches user details by their unique user ID.
   * @param userId The GUID of the user.
   * @returns An Observable of UserDetails.
   */
  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching user details:', error);
        return throwError(() => error);
      })
    );
  }
}