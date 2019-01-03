import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { TitlePipe } from './title.pipe';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { JobComponent } from './job/job.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'job/:id', component: JobComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [AppComponent, TitlePipe, FilterComponent, HomeComponent, JobComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
