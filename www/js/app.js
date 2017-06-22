define(
    [
        'angularAMD', 
        'appConfig', 
        'jquery', 
        'underscore', 

        'ionic-angular',
        'ng-cordova',
        'angular-file-upload',
        
        'angular-moment',
        'angular-local-storage'
    ], 
    function (angularAMD, appConfig, $, _) {
        'use strict';
        
        var app = angular.module('adqua', [
            'ngCordova',
            'ionic', 
            'ngFileUpload',
            'LocalStorageModule', 
            'angularMoment'
        ]);

        

        app.constant('AppConfig', {
            title: '[P&G] MBCI PYC'
        });

        app.config(appConfig);

        app.run(function($rootScope, $window, $state, amMoment, $ionicPlatform, $ionicLoading, $ionicHistory, $ionicPopup, AppConfig) {
            amMoment.changeLocale('ko');

            $ionicPlatform.ready(function(){
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    cordova.plugins.Keyboard.disableScroll(true);
                }

                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

                if($window.MobileAccessibility){
                    $window.MobileAccessibility.usePreferredTextZoom(false);
                }

                $ionicPlatform.registerBackButtonAction(function(event) {
                    var historyObj = angular.copy($ionicHistory.viewHistory());
                    
                    if( (historyObj.backView == null) || (historyObj.backView.stateId == 'app.main') ){
                        showExitPopup();
                    }else{
                        $ionicHistory.goBack(-1);
                    }
                    
                }, 100);
            });
            

            $rootScope.$on('loading::show', showLoading);
            $rootScope.$on('loading::hide', hideLoading);





            var $loading = null,
                  loadingCounts = 0,
                  loadingTimer = null;


            /*
            *    ※ 로딩 바 표시 ※
            */
            function showLoading(){
                $ionicLoading.show({
                    template: '<ion-spinner icon="android"></ion-spinner> <p style="padding-top:10px;">Loading...</p>'
                });
/*
                if( $loading == null )
                    $loading = $('<div />').addClass('loading').html('<img src="/assets/images/common/ajax-loading.gif" alt="loading" />').appendTo('body');

                loadingCounts++;
                $loading.show();
*/
            }


            /*
            *    ※ 로딩 바 숨기기 ※
            */
            function hideLoading(){
                $ionicLoading.hide();
/*
                if( loadingTimer != null )
                    window.clearTimeout(loadingTimer);


                if( --loadingCounts <= 0 ){
                    loadingCounts = 0;

                    loadingTimer = window.setTimeout(function(){
                        $loading.hide();
                    }, 100);
                }
*/
            }


            /*
            *    ※ 앱 종료팝업 표시 ※
            */
            function showExitPopup(){
                $ionicPopup.confirm({
                    title: AppConfig.title,
                    template: '앱을 종료하시겠습니까?'

                }).then(function(res) {
                    if(res) {
                        navigator.app.exitApp();
                    }
                });

            }

        });

        return angularAMD.bootstrap(app);
    }
);
