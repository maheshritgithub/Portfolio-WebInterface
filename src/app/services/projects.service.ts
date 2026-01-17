import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export enum ImageType {
    Png,
    Jpeg,
    Svg
}

export interface ProjectImage {
    isPrimary: boolean;
    data: string; 
    type: ImageType;
    label: string;
}

export interface Project {
    userId: string;
    name: string;
    description: string;
    isHighlighted: boolean;
    technologies: string; 
    projectUrl?: string | null;
    image: ProjectImage[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private apiUrl = `${environment.apiUrl}/Projects`;

  constructor(private http: HttpClient) { }

  /**
   * Fetches projects for a specific user.
   * @param userId The GUID of the user.
   * @returns An Observable of Project[].
   */
  getProjectsByUserId(userId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/user/${environment.userId}`).pipe(
      catchError(error => {
        console.error('Error fetching projects data:', error);
        return of([]);
      })
    );
  }
}