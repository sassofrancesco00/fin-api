// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environmentTest = {
  apiUrlLocal: 'http://localhost:8080/api/v1',
  production: false,

  //Strie Publishable Key TEST
  STRIPE_KEY: 'pk_test_51MVyr6GW69cIwRMT1efQbEbmeHCXPqRHR1El34gKpDaZjhcbubd9z3Vvp0y0JlU3SwM1mlzynMqQerKwFss05ote00qjAv4iRD',
  serverUrl: '/api/stripe',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
