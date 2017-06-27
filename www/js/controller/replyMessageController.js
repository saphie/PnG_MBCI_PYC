define(
    [
		'jquery',
        'angularAMD',
		'underscore'
    ], 
    function( $, angularAMD, _ ){
        'use strict';


        var controller = function( $scope, $ionicPopup, $q, $cordovaCamera, AppConfig ){


            $scope.imageSource = null;
			$scope.snowClick = function(){
				snowPicture();
			};


            $scope.takePicture = openTakePicturePopup;



            /*
            *    ※ 사진 올리기 방법 팝업표시 ※
            */
            function openTakePicturePopup(){
                $ionicPopup.show({
                    title: '사진 올리기',
                    cssClass: 'call-popup',
                    buttons: [
                        {
                            text: '앨범에서 선택',
                            type: 'button-positive',
                            onTap: function(e) {
                                takePicture(0);
                            }
                        },
                        {
                            text: '사진 촬영',
                            type: 'button-positive',
                            onTap: function(e) {
                                takePicture(1);
                            }
                        },
                        {
                            text: '스노우촬영',
                            type: 'button-positive',
                            onTap: function(e) {
                                snowPicture();
                            }
                        },
                    ]
                });
            }



            /*
            *    ※ 사진 촬영 ※
            */
            function takePicture( sourceType ){
                var defer =  $q.defer();

				console.log(navigator.camera);

				if ( navigator.camera ) {
					var cameraOptions = {
						quality: 80,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: sourceType,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 400,
						targetHeight: 400,
						saveToPhotoAlbum: false
					};


					$cordovaCamera
						.getPicture(cameraOptions)
						.then(
							function(result){
								var imageUrl = ('data:image/jpeg;base64,' + result);

								defer.resolve(imageUrl);
							}, 
							defer.reject
						);

					return defer.promise;
				} else {
					changeImage();
				}
            }

			function snowPicture(){
				alert('스노우를 통해 응답해보세요! 더 즐거운 참여가 가능합니다.')
			}

			function changeImage(){
				$('.textmessage input, .textmessage textarea').hide();
				$('.textmessage img').show();
			}
        };


        angularAMD.controller('ReplyMessageController', controller);
    }
);