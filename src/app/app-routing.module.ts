import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about/about.component';
import { JobsComponent } from './components/home/jobs/jobs.component';
import { ProyectsComponent } from './components/home/proyects/proyects.component';
import { ContactComponent } from './components/home/contact/contact.component';
import { NotFoundComponent } from './components/general/not-found/not-found.component';
import { UserExistsGuard } from './services/user-exists.guard';

const routes: Routes = [
  {
    path: 'not found',
    component: NotFoundComponent
  },
  {
    path: ':username',
    component: HomeComponent,
    canActivate: [UserExistsGuard]
  },
  {
    path: ':username/about',
    component: AboutComponent,
    canActivate: [UserExistsGuard]
  },
  {
    path: ':username/experience',
    component: JobsComponent,
    canActivate: [UserExistsGuard]
  },
  {
    path: ':username/project',
    component: ProyectsComponent,
    canActivate: [UserExistsGuard]
  },
  {
    path: ':username/contact',
    component: ContactComponent,
    canActivate: [UserExistsGuard]
  },
  
  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }