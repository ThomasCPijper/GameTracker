import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),

    provideAuth0({
      domain: 'gametracker.eu.auth0.com',
      clientId: '9CeC1qY8Zn7sVARAYSRNioII9ffJxwEQ',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ]
};