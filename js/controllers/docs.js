angular.module('docs.controller', []) 

.controller('docsCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
    
  /**************************** */  
      if($rootScope.authed === 2)
      {
     

$scope.get = function()  {
              var adm1 = localStorage.getItem("adm_no");
              var adm = JSON.stringify(adm1);
              var formData = {
                  adm_no: adm
              };
              var postData = 'myData=' + JSON.stringify(formData);
              $http({

                  method: 'POST',
                  url: 'http://127.0.0.1/zusp/server/getdocs.php',
                  data: postData,
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

              }).success(function (res) {
                  $scope.docs = res;                
              }).error(function (error) {
                  console.log(error);
              });    
}
$scope.get();
             
        


$scope.checkexistance = function () {
    $('#uploadloader').toggleClass('hidden');
    $('#uploadsubmit').addClass('hidden');
            $http({               
                method: 'GET',
                url: 'http://127.0.0.1/z.u.s.pclient/server/checkuserdocsexistance.php',
                params: {
                    name: JSON.stringify( $('#file')[0].files[0].name),
                }

            }).success(function (res) {
                if (res.length < 1) {
                    $scope.upload();
                }
                else {
                    $('#uploadloader').toggleClass('hidden');
                    $('#uploadsubmit').removeClass('hidden');
                    $('#uploaderror').toggleClass('hidden');
                    $rootScope.uploadError = "document with similar name already exists";

                }
            }).error(function (error) {
                console.log(error);
            });
        }


       $scope.upload = function () {

            var formData = new FormData();
            var adm = localStorage.getItem("adm_no");

            formData.append('file', $('#file')[0].files[0]);
            formData.append('adm_no', adm);

        $.ajax({
                url: 'http://127.0.0.1/z.u.s.pclient/server/upload.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    $scope.get();
                    if (data == 1) {
                        $('#uploadloader').toggleClass('hidden');
                        $('#uploadsubmit').removeClass('hidden');
                        $('#uploadsuccess').toggleClass('hidden');
                    } else {
                        $('#uploadloader').toggleClass('hidden');
                        $('#uploadsubmit').removeClass('hidden');
                        $('#uploaderror').toggleClass('hidden');
                        $rootScope.uploadError = "Unable to save file,retry later...";
                    }
                },
                error: function (data) {
                    alert("err")
                },
             });      
        }



        $scope.delete = function (path) {
          
            var adm = localStorage.getItem("adm_no");           
            var path1 = JSON.stringify(path);

              var formData = {
                  adm_no: adm,
                  path: path1
              };
              
              var postData = 'myData=' + JSON.stringify(formData);
              $http({

                  method: 'POST',
                  url: 'http://127.0.0.1/zusp/server/deletedocs.php',
                  data: postData,
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

              }).success(function (res) {
              
                  console.log(res);
                 $scope.get();
              }).error(function (error) {
                  console.log(error);
              });

       

        
        }











     }
    else
    {
    $state.transitionTo('login')    
    }

    
})