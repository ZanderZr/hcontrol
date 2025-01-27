// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endpoint: 'http://localhost:3000/',
  firebase: {
    apiKey: "AIzaSyCMh3oAa4J1wqWPEASL0SB2l-l21JBtGJ0",
    authDomain: "hcontrol-90101.firebaseapp.com",
    projectId: "hcontrol-90101",
    storageBucket: "hcontrol-90101.firebasestorage.app",
    messagingSenderId: "423429795927",
    appId: "1:423429795927:web:e6eaa11f5acce1c2047312",
    measurementId: "G-5YZP03CQNE"
  }
};

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
