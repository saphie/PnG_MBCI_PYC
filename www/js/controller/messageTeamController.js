define(
    [
		'jquery',
        'angularAMD',
		'underscore'
    ], 
    function( $, angularAMD, _ ){
        'use strict';


        var controller = function( $scope, $rootScope, $state, $q ){

            $scope.teamList = [
                { code:'T001', name:'노르딕복합' },
                { code:'T002', name:'루지' },
                { code:'T003', name:'바이애슬론' },
                { code:'T004', name:'봅슬레이' },
                { code:'T005', name:'쇼트트랙' },
                { code:'T006', name:'스노보드' },
                { code:'T007', name:'스켈레톤' },
                { code:'T008', name:'스키점프' },
                { code:'T009', name:'스피드스케이팅' },
                { code:'T010', name:'아이스하키' },
                { code:'T011', name:'알파인스키' },
                { code:'T012', name:'컬링' },
                { code:'T013', name:'크로스컨트리' },
                { code:'T014', name:'프리스타일' },
                { code:'T015', name:'피겨스케이팅' }
            ];

            $scope.selectedTeam = null;


            $scope.setTeam = function( teamCode ){
                $scope.selectedTeam = teamCode;
            };

			$('.team-list > img').on('click', function(){
				$(this).attr('src', '/img/img_message_team_on.png');
			});

        };


        angularAMD.controller('MessageTeamController', controller);
    }
);