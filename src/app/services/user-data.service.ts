import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface UserData {
  id: string;
  fullName: string;
  username: string;
  email: string;
  message: string;
  subject: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = `${environment.apiUrl}/Users`;
  private resumeApiUrl = `${environment.apiUrl}/Resume`;

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all users from the system.
   * @returns An Observable of UserData array containing all users.
   */
  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all users:', error);
        return of([]);
      })
    );
  }

  getUserDataByUsername(username: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/by-username/${environment.userName}`).pipe(
      catchError(error => {
        console.error('Error fetching user data by username:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Downloads a user's resume by their unique user ID.
   * @param userId The GUID of the user.
   * @returns An Observable of Blob containing the resume file.
   */
  downloadResume(userId: string): Observable<Blob> {
    return this.http.get(`${this.resumeApiUrl}/${environment.userId}`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        console.error('Error downloading resume:', error);
        return throwError(() => error);
      })
    );
  }
}