// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "FIREBASE_API_KEY",
    authDomain: "FIREBASE_AUTH_DOMAIN",
    databaseURL: "FIREBASE_DATABASE_URL",
    projectId: "FIREBASE_PROJECT_ID",
    storageBucket: "FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "FIREBASE_MESSAGE_SENDER_ID",
    appId: "FIREBASE_APP_ID"
  },
  apiUrl: {
    addSubscription: "API_URL_ADD_SUBSCRIPTION_API",
    removeSubscription: "API_URL_REMOVE_SUBSCRIPTION",
    getSubscriptions: "API_URL_GET_SUBSCRIPTIONS",
    clearAllSubscripts: "API_URL_CLEAR_ALL_SUBSCRIPTIONS",
    sendPushMessage: "API_URL_SEND_PUSH_MESSAGE"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
