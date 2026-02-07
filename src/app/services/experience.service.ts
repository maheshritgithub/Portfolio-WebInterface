import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ProjectModel {
  name: string;
  description: string;
  technologies?: string[];
  contribution?: string;
}

export interface ImpactModel {
  id: string;
  statement: string;
}

export interface Experience {
  id?: string; 
  userId: string;
  companyName: string;
  role: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
  responsibilities: string[];
  projects?: ProjectModel[];
  impact?: ImpactModel[];
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/Experience`;

  constructor(private http: HttpClient) { }

  getExperienceByUserId(userId: string): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/user/${userId}`).pipe(
      catchError(error => {
        console.error('Error fetching experience data:', error);
        return of([]);
      })
    );
  }
}