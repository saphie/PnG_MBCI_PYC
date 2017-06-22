require.config({
    baseUrl: 'js/',
    urlArgs : 'ts=' + (new Date()).getTime(),
    waitSeconds: 15,
    paths: {
        'text': '../lib/require/text-2.0.14',
        
        'jquery': '../lib/jquery/jquery-1.12.4.min',
        'jquery-ui': '../lib/jquery/jquery-ui.min',
        'jquery-touch': '../lib/jquery/jquery.touch.min',

        'angular': '../lib/angular/angular.min',
        'angular-route': '../lib/angular/angular-route.min',
        'angular-resource': '../lib/angular/angular-resource.min',
        'angular-animate': '../lib/angular/angular-animate.min',
        'angular-sanitize': '../lib/angular/angular-sanitize.min',
        'angular-touch': '../lib/angular/angular-touch.min',
        'angular-ui-router': '../lib/angular/angular-ui-router.min',

        'angularAMD': '../lib/angularAMD/angularAMD.min',
        
        'ionic': '../lib/ionic/js/ionic.min',
        'ionic-angular': '../lib/ionic/js/ionic-angular.min',

        'moment': '../lib/angular-moment/moment-with-locales.min',
        'angular-moment': '../lib/angular-moment/angular-moment.min',

        'angular-local-storage': '../lib/angular-local-storage/angular-local-storage.min',
        'angular-file-upload': '../lib/ng-file-upload/ng-file-upload.min',

        'underscore': '../lib/underscore-min',

        'TweenMax': '../lib/TweenMax.min',
        'ng-cordova': '../lib/ng-cordova.min'
    },
    shim:{
        'jquery': { exports: '$' },
        'jquery-ui': ['jquery'],
        'jquery-touch': ['jquery'],

        'angular': { exports: 'angular' },
        'angular-route': ['angular'],
        'angular-resource': ['angular'],
        'angular-animate': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-touch': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-local-storage': ['angular'],
        'angular-moment': ['angular', 'moment'],
        'angular-file-upload': ['angular'],
        'angularAMD': ['angular'],
        'ng-cordova': ['angular'],

        'ionic': { exports: 'ionic' },
        'ionic-angular': ['angular', 'ionic', 'angular-ui-router', 'angular-animate', 'angular-sanitize', 'angular-touch'],

        'underscore': { exports: '_' }
    },

    deps: ['app']
});