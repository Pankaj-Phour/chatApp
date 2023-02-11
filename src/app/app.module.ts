import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './landing/home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { TopComponent } from './user/top/top.component';
import { MainComponent, MenuBox } from './user/main/main.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopComponent,
    MainComponent,
    MenuBox
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    PickerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[MenuBox]
})
export class AppModule { }
