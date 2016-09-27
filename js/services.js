angular.module('SimpleRESTIonic.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

 .service('ItemsModel', function ($http, Backand,$rootScope) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'users/';

       
        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

       service.fetch = function (id) {
            return $http.get(getUrlForId(id))                                
             .then(function(response) {
                 console.log(response.data.adm);       
                  localStorage["adm_no"] =response.data.adm;         
            });         
        }; 
            
            
            
            
            
         
        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };
    })
    
     .service('calenderService', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'schoolCalender/';

       
        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };


    })

    .service('AuthService', function (Backand,$rootScope,$state) {
        var service = this;

       service.isAuthenticated = function(){
              var ss = sessionStorage.getItem("adm_no"); 
              var ls  = localStorage.getItem("adm_no");
              
              if(ss === null){
                  console.log("session storage is empty,checking local storage");
                  $rootScope.authed = 1;
               if(ls === null){
                   console.log("session storage is also empty");
                   $rootScope.authed =  1;
               }  
               //ll
               else{
                  console.log("ll has a value so we good") 
                   $rootScope.authed = 2;
               }
               
               } 
               //ss
                  else
                  {
                     console.log("ss has a value so we good");
                     $rootScope.authed = 2;
                  }
                  
       };
       





        service.signin = function (email, password, appName) {
            return Backand.signin(email, password);
        };




         service.signup = function (firstName, lastName, username, password, parameters) {
            return Backand.signup(firstName, lastName, username, password, password, parameters)
                .then(function (signUpResponse) {
                    if (signUpResponse.data.currentStatus === 1) {
                        return self.signin(username, password)
                            .then(function () {
                                return signUpResponse;
                            });

                    } else {
                        return signUpResponse;
                    }
                });
        };


        service.changePassword = function (oldPassword, newPassword) {
            return Backand.changePassword(oldPassword, newPassword)
        };

        service.requestResetPassword = function (username) {
            return Backand.requestResetPassword(username)
        };

        service.resetPassword = function (password, token) {
            return Backand.resetPassword(password, token)
        };













        service.anonymousLogin= function(){}

        service.signout = function () {
            return Backand.signout().then(function () {
                $rootScope.$broadcast('logout');
                $state.go($state.current, {}, { reload: true });
                $state.transitionTo('login');
                alert("bye :( ");
                 localStorage.removeItem("adm_no");
                 localStorage.removeItem("role");
                 localStorage.removeItem("uid");
                 localStorage.removeItem("course");
                 localStorage.removeItem("Full_Name");
            })
        };
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    });

        