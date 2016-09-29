


var portal = angular.module('portal', ['ui.router', 'downloadcenter.controller', 'examreg.controller', 'landing.controller', 'accounts.controller', 'noticeboard.controller', 'results.controller', 'auth.controller', 'calender.controller', 'docs.controller', 'units.controller', 'library.controller', 'ui.materialize', 'ui.calendar', 'ui.bootstrap', 'backand', 'SimpleRESTIonic.services']);

 portal.run(function($rootScope,$state,AuthService){
  
   localStorage.setItem("adm_no","B/0871/2013");
    $rootScope.role = localStorage.getItem("role");
    if( $rootScope.role === "Admin"){
       $rootScope.rr = 1;
    }
    else{
       // console.log("esteem");
    }
 console.log($rootScope.role);
 AuthService.isAuthenticated();
 });


portal.config(function ($stateProvider, $urlRouterProvider, BackandProvider) {    

           $('.button-collapse').sideNav({
      menuWidth:200, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick:false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  
      BackandProvider.setAppName('zuportal');
      BackandProvider.setSignUpToken('4f9da5d2-f553-41b5-94fa-f6ca0bf0ef15');
      BackandProvider.setAnonymousToken('8f3af7c5-d66b-4592-83ed-e3e1f56248ca');
    $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'authCtrl',
 
      })


        .state('main', {
            url: '/main',
            templateUrl: 'templates/main.html',
        })

            .state('calender', {
                url: '/calender',
                templateUrl: 'templates/calender.html',
                controller: 'calCtrl',


            })
            
            .state('noticeboard', {
                url: '/noticeboard',
                templateUrl: 'templates/noticeboard.html',
                controller: 'noticeCtrl',


            })

            .state('mydocs', {
                url: '/mydocs',
                templateUrl: 'templates/mydocs.html',
                controller: 'docsCtrl',
            })

                .state('res', {
                    url: '/res',
                    templateUrl: 'templates/res.html',
                    controller: 'resCtrl',
                })

                   .state('regunit', {
                       url: '/regunit',
                       templateUrl: 'templates/unitreg.html',
                       controller: 'unitregCtrl',
                   })
                   
                   
                     .state('accounts', {
                       url: '/accounts',
                       templateUrl: 'templates/accounts.html',
                       controller: 'accCtrl',
                   })
                   
                  .state('downloadables', {
                       url: '/downloadables',
                       templateUrl: 'templates/downloadables.html',
                       controller: 'downloadcenterCtrl',
                  })

                      .state('examreg', {
                          url: '/examreg',
                          templateUrl: 'templates/examreg.html',
                          controller: 'examregCtrl',
                      })

})



