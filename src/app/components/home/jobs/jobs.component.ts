import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ExperienceService, Experience } from 'src/app/services/experience.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    standalone: false
})
export class JobsComponent implements OnInit, AfterViewInit {

  active = 0;
  experiences: Experience[] = [];
  isLoading: boolean = true;

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef,
    private experienceService: ExperienceService,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadExperiences();
  }

  ngAfterViewInit(): void {
  }

  private loadExperiences(): void {
    this.isLoading = true;
    const username = this.route.snapshot.paramMap.get('username');
    this.userDataService.getUserDataByUsername(username).pipe(
      switchMap(user => {
        if (user && user.id) {
          return this.experienceService.getExperienceByUserId(user.id);
        } else {
          return []; 
        }
      })
    ).subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        this.isLoading = false;
        setTimeout(() => this.initAnimations(), 0);
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.isLoading = false;
      }
    });
  }

  private initAnimations(): void {
    const jobsSection = this.elementRef.nativeElement;

    const title = jobsSection.querySelector('.about-title');
    if (title) {
      this.animationsService.observeElement(title, {
        type: 'slideInUp',
        duration: 1000
      });
    }

    // Animar contenedor de tabs
    const tabsContainer = jobsSection.querySelector('.jobs-tabs');
    if (tabsContainer) {
      this.animationsService.observeElement(tabsContainer as HTMLElement, {
        type: 'fadeInUp',
        duration: 1200,
        delay: 300
      });
    }

    // Animar tabs individuales
    const tabs = jobsSection.querySelectorAll('li[ngbNavItem]');
    tabs.forEach((tab: HTMLElement, index: number) => {
      this.animationsService.observeElement(tab, {
        type: 'scaleIn',
        delay: 600 + (index * 150)
      });

      // Añadir efectos hover
      this.animationsService.addHoverEffects(tab, ['lift']);
    });

    setTimeout(() => {
      const jobDescriptions = jobsSection.querySelectorAll('.job-description');
      jobDescriptions.forEach((desc: HTMLElement, index: number) => {
        this.animationsService.observeElement(desc, {
          type: 'fadeInLeft',
          delay: index * 200
        });
      });
    }, 1000);
  }
}