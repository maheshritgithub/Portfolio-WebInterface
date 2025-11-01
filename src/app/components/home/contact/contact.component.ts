
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnimationsService } from 'src/app/services/animations/animations.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit, AfterViewInit {

  userEmail: string = '';

  constructor(
    public analyticsService: AnalyticsService,
    private animationsService: AnimationsService,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadUserDetails();
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

      console.log('User Data:', userData);

      // Store the email from user data
      if (userData.email) {
        this.userEmail = userData.email;
      }

      console.log('User Email:', this.userEmail);
      

    } catch (err) {
    }
  }

  ngAfterViewInit(): void {
    this.initAnimations();
  }

  private initAnimations(): void {
    const contactSection = this.elementRef.nativeElement;

    // Animar contenedor del título
    const titleContainer = contactSection.querySelector('.mb-4');
    if (titleContainer) {
      this.animationsService.observeElement(titleContainer, {
        type: 'fadeInDown',
        duration: 1000
      });
    }

    // Animar título principal con typewriter
    const mainTitle = contactSection.querySelector('.contact-title');
    if (mainTitle) {
      this.animationsService.observeElement(mainTitle, {
        type: 'typewriter',
        delay: 500
      });
    }

    // Animar párrafo de descripción
    const description = contactSection.querySelector('p');
    if (description) {
      this.animationsService.observeElement(description, {
        type: 'morphIn',
        duration: 1200,
        delay: 2500
      });
    }

    // Animar botón de contacto
    const contactButton = contactSection.querySelector('.contact-btn');
    if (contactButton) {
      this.animationsService.observeElement(contactButton.parentElement as HTMLElement, {
        type: 'scaleIn',
        duration: 800,
        delay: 3500
      });

      // Añadir efectos hover especiales al botón
      this.animationsService.addHoverEffects(contactButton as HTMLElement, ['lift', 'glow']);
    }
  }
}