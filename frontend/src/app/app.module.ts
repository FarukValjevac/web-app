import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  // Import necessary Angular modules and components
  imports: [BrowserModule, AppComponent, FormsModule],

  // Register global providers
  providers: [
    provideHttpClient(), // Enables HTTP communication
  ],

  // Define the root component to bootstrap when the app starts
  bootstrap: [AppComponent],
})
export class AppModule {}
