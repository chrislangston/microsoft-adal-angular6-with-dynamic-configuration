import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { ClientSettingsService } from './clientsettings.service';

let adalConfig: any = {
  'clientId': '',
  'tenant': '',
  'cacheLocation': 'localStorage',
  'navigateToLoginRequestUrl': true,
  'postLogoutRedirectUri': '',
  'endpoints': {
    '<web-api-url-goes-here>': '<azure-ad-client-id-to-the-web-api-goes-here>'
  }
};

export function msAdalAngular6ConfigFactory() {
  console.log('Returning the adalConfig - msAdalAngular6ConfigFactory.  The values for this configuration was populated in the APP_INITIALIZER', adalConfig);
  return adalConfig; // will be invoked later when creating MsAdalAngular6Service
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsAdalAngular6Module
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ClientSettingsService],
      useFactory: (clientSettingsService: ClientSettingsService) => {
        return async () => {
          console.log('Starting APP_INITIALIZER ...');

          console.log('Before making an Http call to an endpoint that returns the configuration my Angular App needs for things such as security...');
          console.log('If you want to pull from a WebSite, then make sure there is an Endpoint running at /api/clientsetings.');
          const response = await fetch('/api/clientsettings');
          const json = await response.json();

          clientSettingsService.clientSettings = json;

          console.log('fetched ClientSettings from WebApp to configure front-end', json);

          const webApiRootUrl = `${json.webApiEndpointUrl}api/`;
          var rootWebApi = `${webApiRootUrl}`;

          adalConfig.clientId = `${json.clientId}`;

          adalConfig.tenant = '{PUT-IN-YOUR-TENANT-DOMAIN-NAME-HERE OR USE-YOUR-TENTANT-ID}.onmicrosoft.com';
          adalConfig.cacheLocation = 'localStorage';
          adalConfig.redirectUri = window.location.origin;
          adalConfig.navigateToLoginRequestUrl = true;
          adalConfig.postLogoutRedirectUri = `${window.location.origin}/logged-out`;

          // endpoints: {
          //   "[HOME_URL_WEB_API]": "[HOME_WEB_API_GUID]"
          // }

          adalConfig.endpoints = {
            'https://graph.microsoft.com': 'https://graph.microsoft.com',
            'https://graph.microsoft.com/User.Read': '00000003-0000-0000-c000-000000000000'
          }
          adalConfig.endpoints[`${json.webApiEndpointUrl}`] = `${json.webApiClientId}`;

          if (`${json.azureActiveDirectoryWebApiApplicationIdUri}` in adalConfig.endpoints === false){
            adalConfig.endpoints[`${json.azureActiveDirectoryWebApiApplicationIdUri}`] = `${json.webApiClientId}`;
          }
          JSON.stringify(adalConfig);
        };
      }
    },
    MsAdalAngular6Service,
    {
      provide: 'adalConfig',
      useFactory: msAdalAngular6ConfigFactory,
      deps: []
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
