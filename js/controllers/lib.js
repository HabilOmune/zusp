angular.module('library.controller', []) 

.controller('libCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
    
    /******************************/
    
    
       var adm1 = localStorage.getItem("adm_no");
       var adm = JSON.stringify(adm1);              
           var formData = {
               adm_no: adm
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/getlibrary.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.libraryRecords = res;
               console.log($scope.libraryRecords);

           }).error(function (error) {
               console.log(error);
           });       
  
  

   
})