



angular.module('landing.controller', []) 
.controller('lndnCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
  
  
  
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
   /************************************** */ 
 
    $scope.feestructures = function()  
        {
            $state.transitionTo('downloadables');
            $('#feestructures').toggleClass("hidden");
        }
        
        $scope.courseoutlines = function()  
        {
            $state.go('downloadables');
            $('#courseoutlines').toggleClass("hidden");
        }
              
 $scope.load = function(){
      
       var adm1 = localStorage.getItem("adm_no");
       var adm = JSON.stringify(adm1);              
           var formData = {
               adm_no: adm
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/getstudentbio.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.mybio = res;
                   localStorage.setItem("course",$scope.mybio[0].course);
                   localStorage.setItem("Full_Name",$scope.mybio[0].fname+" "+$scope.mybio[0].mname+" "+$scope.mybio[0].surname);
               
                   
           }).error(function (error) {
               console.log(error);
           })
 

 var course_code = JSON.stringify(localStorage.getItem("course"));

          var formData2 = {
               course_code: course_code
           };
           var postData2 = 'myData=' + JSON.stringify(formData2);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/getcourse.php',
               data: postData2,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.myCourse  = res;

           }).error(function (error) { 
               console.log(error);
           }); 
            
   }         
    
             
           
    
    
 
    $scope.load();
    
    
    
})