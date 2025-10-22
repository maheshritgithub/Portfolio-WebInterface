import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { UserDataService } from 'src/app/services/user-data.service';
import { ProjectsService, Project, ProjectImage, ImageType } from 'src/app/services/projects.service';

interface DisplayProject {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  ghLink?: string | null;
  imgs: SafeResourceUrl[];
  img: SafeResourceUrl;
}

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss'],
  standalone: false
})
export class ProyectsComponent implements OnInit {

  @ViewChild('imgContainer') imgContainer: ElementRef;

  projects: DisplayProject[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000
  };

  constructor(
    public analyticsService: AnalyticsService,
    private route: ActivatedRoute,
    private userDataService: UserDataService,
    private projectsService: ProjectsService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(() => {
        const username = this.route.snapshot.paramMap.get('username');
        return this.userDataService.getUserDataByUsername(username!);
      }),
      switchMap(user => this.projectsService.getProjectsByUserId(user.id))
    ).subscribe(projects => {
      this.projects = this.mapProjects(projects);
      console.log('Mapped projects:', this.projects);
    });
  }


  private mapProjects(projects: Project[]): DisplayProject[] {
  return projects
    .filter(p => p.isHighlighted)
    .map(project => {
      const imgs: SafeResourceUrl[] = project.image.map(img => {
        const imageType = img.type === ImageType.Png ? 'png' :
                          img.type === ImageType.Jpeg ? 'jpeg' : 'svg+xml';
        const imageDataUrl = `data:image/${imageType};base64,${img.data}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(imageDataUrl);
      });

      const primaryIndex: number = project.image.findIndex(img => img.isPrimary);
      const safeIndex: number = primaryIndex >= 0 ? primaryIndex : 0;

      return {
        title: project.name,
        description: project.description,
        technologies: project.technologies ? project.technologies.split(',').map(t => t.trim()) : [],
        demoLink: project.projectUrl,
        ghLink: null,
        imgs: imgs,
        img: imgs.length > 0 ? imgs[safeIndex] : this.sanitizer.bypassSecurityTrustResourceUrl('')
      };
    });
}

  debug(): void {
    if (this.imgContainer) {
      this.imgContainer.nativeElement.scroll({
        top: this.imgContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

}
