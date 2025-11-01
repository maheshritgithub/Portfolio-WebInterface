import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about/about.component';
import { JobsComponent } from './components/home/jobs/jobs.component';
import { ProyectsComponent } from './components/home/proyects/proyects.component';
import { ContactComponent } from './components/home/contact/contact.component';

const routes: Routes = [

  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: ':username/about', component: AboutComponent},
  {path: ':username/experience', component: JobsComponent},
  {path: ':username/project', component: ProyectsComponent},
  {path: ':username/contact', component: ContactComponent},
  {path: ':username', component: HomeComponent},
  
  // {path: 'profile'        ,   component: ProfileComponent         , canActivate: [AuthGuard]},
  // {path: 'users'          ,   component: UsersComponent           , canActivate: [AuthGuard]},
  // {path: 'register-user'  ,   component: RegisterUserComponent    , canActivate: [AuthGuard]},

  {path: '**', pathMatch: 'full', redirectTo: ''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }