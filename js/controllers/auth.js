angular.module('auth.controller', []) 

.controller('authCtrl', function ($rootScope, AuthService,ItemsModel, $scope, $state, $http, $compile, $timeout) {
    
   $rootScope.si=0;

        function onLogin(){


        /*  var adm =  localStorage["adm_no"];
           var formData = {
               adm_no: adm
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/mkdr.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               console.log(res);
           }).error(function (error) {
               console.log(error);
           });
*/




           
        }
        
    $scope.login = function () {
       
    var  un=$scope.username;
     var pw = $scope.password;
 
     AuthService.signin(un,pw)
                        .then(function (response) {
                $rootScope.authdata = response;
                console.log($rootScope.authdata); 
                var  id = $rootScope.authdata.userId;
                ItemsModel.fetch(id)
                .then(function(response) {    
                localStorage["role"] = $rootScope.authdata.role;
                localStorage["uid"] = $rootScope.authdata.userId;     
                console.log("login successfull"); 
               $state.transitionTo('main');         
            });                                                            

                
                
                
                
                
                
                
                 
                              
                }, function (error) {
                    $scope.errormessage = error.error_description;
                });
                


               
    }

     
})