import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:5218/api/Users';
  private resumeApiUrl = 'http://localhost:5218/api/Resume';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all users from the system.
   * @returns An Observable of UserData array containing all users.
   */
  getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }

  getUserDataByUsername(username: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/by-username/${username}`);
  }

  /**
   * Downloads a user's resume by their unique user ID.
   * @param userId The GUID of the user.
   * @returns An Observable of Blob containing the resume file.
   */
  downloadResume(userId: string): Observable<Blob> {
    return this.http.get(`${this.resumeApiUrl}/${userId}`, {
      responseType: 'blob'
    });
  }
}