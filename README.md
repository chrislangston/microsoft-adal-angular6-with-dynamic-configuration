# Dynamic Microsoft Adal Angular Config

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.1.

This sample repo shows how one can pull the necessary configuration from a Website to configure
this Microsoft Adal Angular Library.

Visit https://www.npmjs.com/package/microsoft-adal-angular6 to see more about configuration.


In my case I had a .NET Core Website serving up our Angular Application.  
- We have 1 Public Endpoint that exposes Adal Configuration. (/api/clientsettings)
- For IE11 I had to include the fetch polyfill

## Sample Configuration Sent From Sever 
Below is a sample of the JSON response that my Website hosting my Angular Application sends down to configure the Angular Front-End.

`
"ClientSettings": {
    "WebApiEndpointUrl": "http://localhost:64553/",
    "ClientId": "The Azure AD Client Id found in the Portal for the Front-End SPA",
    "Authority": "https://login.microsoftonline.com/{YOUR-DOMAIN-NAME}.onmicrosoft.com",
    "WebApiClientId": "The Azure AD Client Id for your WebAPI",
    "AzureActiveDirectoryWebApiApplicationIdUri": "https://ANY-APPLICATION-ID-URI-YOU-WANT-TO-GIVE-YOUR-WEBAPI.azurewebsites.net",
    "TenantId": "Your Azure AD Tenant ID"
  }
`


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
