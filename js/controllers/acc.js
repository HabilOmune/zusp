angular.module('accounts.controller', []) 

.controller('accCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
   /************************************** */ 

    $scope.feestructure = [
        {
	    "name": "Tuition Fee",
        "value": 75000
        },

      {
        "name": "Exam Fee",
        "value": 4200
      },
 
    {
        "name": "Library Fee",
        "value": 6600
    },

    {
        "name": "Activity Fee",
        "value": 5000
    }

    ]  
    
    
       var adm1 = localStorage.getItem("adm_no");
       var adm = JSON.stringify(adm1);              
           var formData = {
               adm_no: adm
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/getaccount.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.paymentHistory  = res;
           console.log($scope.paymentHistory);

           }).error(function (error) {
               console.log(error);
           }); 
           
           
    
    
 
    
    
    
    
})