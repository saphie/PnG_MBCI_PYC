define(
    [
        'angularAMD',
        'underscore'
    ], 
    function( angularAMD, _ ){
        'use strict';


        var config = function( $locationProvider, $urlRouterProvider, $httpProvider, $stateProvider ){

            $stateProvider
                .state('app', angularAMD.route({
                    abstract: true,
                    templateUrl: './views/layout.html?ts=' + (new Date()).getTime()
                }))
                .state('app.main', angularAMD.route({
                    url: '/',
                    views: {
                        'menuContent': {
                            templateUrl: './views/main.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
                .state('app.message-teams', angularAMD.route({
                    url: '/teams',
                    controllerUrl: 'controller/messageTeamController',
                    views: {
                        'menuContent': {
                            controller: 'MessageTeamController',
                            templateUrl: './views/message-teams.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
				.state('app.message-select', angularAMD.route({
                    url: '/select',
                    views: {
                        'menuContent': {
                            templateUrl: './views/message-select.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
				.state('app.message-text', angularAMD.route({
                    url: '/text',
                    controllerUrl: 'controller/messageTextController',
                    views: {
                        'menuContent': {
                            controller: 'MessageTextController',
                            templateUrl: './views/message-text.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
				.state('app.message-visual', angularAMD.route({
                    url: '/visual',
                    controllerUrl: 'controller/messageVisualController',
                    views: {
                        'menuContent': {
                            controller: 'MessageVisualController',
                            templateUrl: './views/message-visual.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
                .state('app.reply-message', angularAMD.route({
                    url: '/reply',
                    controllerUrl: 'controller/replyMessageController',
                    views: {
                        'menuContent': {
                            controller: 'ReplyMessageController',
                            templateUrl: './views/reply-message.html?ts=' + (new Date()).getTime()
                        }
                    }
                }))
				.state('app.reply-info', angularAMD.route({
                    url: '/info',
                    views: {
                        'menuContent': {
                            templateUrl: './views/reply-info.html?ts=' + (new Date()).getTime()
                        }
                    }
                }));




            $urlRouterProvider.otherwise('/');

            $httpProvider.interceptors.push(loadingInterceptor);
            $httpProvider.interceptors.push(serviceApiInterceptor);
            $httpProvider.interceptors.push(transformRequestAsFormPost);






            /*
                ※ 로딩 - HTTP 인터셉터 ※
            */
            function loadingInterceptor( $rootScope ){
                return {
                    request: function(config){
                        //console.log('[loadingInterceptor] url:', config.url);

                        $rootScope.$emit('loading::show');
                        return config;
                    },

                    response: function(response){
                        $rootScope.$emit('loading::hide');
                        return response;
                    },

                    responseError: function(response){
                        $rootScope.$emit('loading::hide');
                        return response;
                    }
                };
            }



            /*
                ※ 서비스 API - HTTP 인터셉터 ※
            */
            function serviceApiInterceptor( $rootScope, $q ){
                return {
                    response: function(response){
                        if( response.headers()['content-type'] && (response.headers()['content-type'].indexOf('application/json') >= 0) ){
                            return ( response.data || $q.when(response.data) );
                        } else{
                            return ( response || $q.when(response) );
                        }
                    },

                    responseError: function(response){
                        if( response.headers()['content-type'] && (response.headers()['content-type'].indexOf('application/json') >= 0) && response.data && response.data.code ) {
                            alert( (response.data.message || '시스템 오류가 발생하였습니다!') );
                            $rootScope.$emit('history::back');

                        }

                        return $q.reject(response);
                    }
                };
            }



            /*
                ※ POST전송 지원 - HTTP 인터셉터 ※
            */
            function transformRequestAsFormPost( $q ){
                function serializeData( data ){
                    if( !angular.isObject(data) ){
                        return (( data == null ) ? '' : data.toString());
                    }

                    var buffer = [];

                    for(var name in data) {
                        if( !data.hasOwnProperty(name) ){
                            continue;
                        }

                        var value = data[name];

                        buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
                    }

                    return buffer.join('&').replace(/%20/g, "+");
                }


                return {
                    request: function( config ){
                        if( (config.method == 'POST') && (config.headers['Content-Type'] != null) ){
                            config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
                            config.transformRequest = serializeData;
                        }

                        return config;
                    }
                };
            }

        };



        return [ '$locationProvider', '$urlRouterProvider', '$httpProvider', '$stateProvider', config ];
    }
);
