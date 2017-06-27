define(
    [
        'jquery',
		'angularAMD',
		'underscore'
    ], 
    function( $, angularAMD, _ ){
        'use strict';


        var controller = function( $scope, $rootScope, $state, $q ){

            var pageNo = 1;


            $scope.dataList = [];
            textmore();


			$scope.textmore = textmore;


			function textmore(){
                $scope.dataList.push({ no:pageNo++, src:'img/list_messagetext.png' });
			}
        };


        angularAMD.controller('MessageTextController', controller);
    }
);