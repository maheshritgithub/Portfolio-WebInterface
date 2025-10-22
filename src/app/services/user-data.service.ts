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

  constructor(private http: HttpClient) { }

  getUserDataByUsername(username: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.apiUrl}/by-username/${username}`);
  }
}