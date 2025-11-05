import { Component, OnInit, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserDetailsService, UserDetails } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: false,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.3)', opacity: 0 }),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

  isImageModalOpen = false;
  aboutParagraphs: string[] = [];
  skills: string[] = [];
  profileImageUrl: SafeUrl | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef,
    private userDetailsService: UserDetailsService,
    private userDataService: UserDataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
    
  ) { 
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

private async loadUserDetails(): Promise<void> {
  try {

    // Get the username from route
    const username = this.route.snapshot.paramMap.get('username');

    if (!username) {
      return;
    }

    // First API call to get user data
    const userData = await this.userDataService.getUserDataByUsername(username).toPromise();

    if (!userData?.id) {
      return;
    }

    // Second API call to get detailed user info
    const details = await this.userDetailsService.getUserDetails(userData.id).toPromise();

    if (details) {
      this.populateDetails(details);
    } else {
    }

  } catch (err) {
  }
}

  

  private populateDetails(details: UserDetails): void {
    this.aboutParagraphs = details.about
      ? details.about.split('\n').filter(p => p.trim() !== '')
      : [];
    this.skills = details.skillSet || [];

    if (details.profileImage) {
      const imageUrl = `data:image/png;base64,${details.profileImage}`;
      this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    }
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onImageClick(): void {
    this.analyticsService.sendAnalyticEvent('click_image', 'about', 'image');
    this.openImageModal();
  }

  openImageModal(): void {
    this.isImageModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  onModalBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeImageModal();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeImageModal();
    }
  }

  private initAnimations(): void {
    const aboutSection = this.elementRef.nativeElement;

    const title = aboutSection.querySelector('.about-title');
    if (title) this.animationsService.observeElement(title);

    const paragraphs = aboutSection.querySelectorAll('.about-description p');
    paragraphs.forEach((p: HTMLElement) => this.animationsService.observeElement(p));

    const skillsList = aboutSection.querySelector('.skills-list');
    if (skillsList) this.animationsService.observeElement(skillsList as HTMLElement);

    const skills = aboutSection.querySelectorAll('.skill-element');
    skills.forEach((skill: HTMLElement) => {
      this.animationsService.observeElement(skill);
      this.animationsService.addHoverEffects(skill, ['lift', 'glow']);
    });

    const imageContainer = aboutSection.querySelector('[data-animate="morphIn"]');
    if (imageContainer) this.animationsService.observeElement(imageContainer as HTMLElement);
  }
}
