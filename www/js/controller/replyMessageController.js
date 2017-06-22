define(
    [
        'angularAMD',
		'underscore'
    ], 
    function( angularAMD, _ ){
        'use strict';


        var controller = function( $scope, $ionicPopup, $q, $cordovaCamera, AppConfig ){


            $scope.imageSource = null;


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
                            text: '<b>앨범에서 선택</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                takePicture(0);
                            }
                        },
                        {
                            text: '<b>사진 촬영</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                takePicture(1);
                            }
                        },
                        { text: '취 소' }
                    ]
                });
            }



            /*
            *    ※ 사진 촬영 ※
            */
            function takePicture( sourceType ){
                var defer =  $q.defer();

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
            }

        };


        angularAMD.controller('ReplyMessageController', controller);
    }
);