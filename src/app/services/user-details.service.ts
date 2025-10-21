import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5218/api/UserDetails';

  constructor(private http: HttpClient) { }

  /**
   * Fetches user details by their unique user ID.
   * @param userId The GUID of the user.
   * @returns An Observable of UserDetails.
   */
  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.apiUrl}/${userId}`);
  }
}