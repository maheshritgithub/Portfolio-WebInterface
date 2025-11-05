import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Experience {
  id: string;
  userId: string;
  companyName: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  responsibilities: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:5218/api/Experience';

  constructor(private http: HttpClient) { }

  getExperienceByUserId(userId: string): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        return of([]);
      })
    );
  }
}