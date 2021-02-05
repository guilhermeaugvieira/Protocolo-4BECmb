import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { InterceptorService } from '../services/InterceptorService/interceptor.service';

export const httpInterceptorsProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
];
