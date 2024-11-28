import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { HomeComponent } from './app/home/home.component';
import { AddEditComponent } from './app/add-edit/add-edit.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'add-edit', component: AddEditComponent },
    ]),
  ],
});