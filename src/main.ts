import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './app/reducers';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    StoreModule.forRoot(reducers, { metaReducers }),
      StoreDevtoolsModule.instrument({
        name: 'NTT Movie',
        logOnly: true
      });
  }).catch((err) => console.error(err));
