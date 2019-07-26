// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 // serviceUrl : 'http://localhost:3000/employees',
 serviceUrl : 'http://localhost:3000/employees',
  firebase: {
    apiKey: "AIzaSyDEMfglTG1JS3WswffGgPAJZxP3UR03h78",
    authDomain: "contact-system-4b7e0.firebaseapp.com",
    databaseURL: "https://contact-system-4b7e0.firebaseio.com",
    projectId: "contact-system-4b7e0",
    storageBucket: "",
    messagingSenderId: "744080203210"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
