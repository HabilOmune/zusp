angular.module('calender.controller', [])
 
.controller('calCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
    
  /********************* */
   if($rootScope.authed === 2)
    {
         

      
      
      
  $scope.eventsSources = {
    url:'http://127.0.0.1/zusp/server/zucalendar.php',
    color: 'darkblue',   // an option!
    textColor: 'white' // an option!
  };     
      
  

    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };


    /* config object */
    $scope.uiConfig = {
      calendar:{
          height: 550,
        editable: false,
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    }; 
        
   }
   
   else{
       $state.go('login');
   }
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
})
