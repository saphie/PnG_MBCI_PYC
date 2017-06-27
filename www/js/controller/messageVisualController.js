define(
    [
        'jquery',
		'angularAMD',
		'underscore'
    ], 
    function( $, angularAMD, _ ){
        'use strict';


        var controller = function( $scope, $rootScope, $state, $q ){

            $scope.textmore = function(){
				textmore();
			}

			function textmore(){
				$('.list').append('<img src="/img/list_messagevisual.png" alt="">');
				$('.scroll-content').css({ overflow : 'auto' });
			}

        };


        angularAMD.controller('MessageVisualController', controller);
    }
);