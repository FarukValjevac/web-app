import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

// This object configures the root of the Angular application
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimizes change detection by coalescing multiple events into one cycle
    // Reduces the number of change detection runs for better performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Registers the app's routes using Angular's standalone routing system
    provideRouter(routes),

    // Enables hydration for server-side rendering (SSR) apps
    // This helps reuse server-rendered HTML instead of re-rendering everything on the client
    provideClientHydration(withEventReplay()),

    // Registers HttpClient service for making HTTP requests
    provideHttpClient(),

    // Adds Fetch API support to HttpClient (alternative to XMLHttpRequest)
    // Useful for modern APIs and better integration with streaming/fetch-native services
    provideHttpClient(withFetch()),
  ],
};
