import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      ToastrModule.forRoot(), // Asegura que Toastr está importado correctamente
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(ToastrModule.forRoot()), provideAnimationsAsync(), provideAnimationsAsync()
  ]
};
