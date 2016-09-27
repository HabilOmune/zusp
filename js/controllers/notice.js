angular.module('noticeboard.controller', []) 

.controller('noticeCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
    
    /******************************/
 if($rootScope.authed === 2)
    { 
       
     

     /*SUGGESTIONS*/

     if ($scope.courses == undefined) {
         $http({
             method: 'GET',
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/generalscripts/getallcourses.php'
         }).then(function
                          successCallback(response) {
             $rootScope.courses = response.data;
         }, function errorCallback(response) {
             $rootScope.courses = [];
         });
     }

     if ($scope.categories == undefined) {
         $http({
             method: 'GET',
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/generalscripts/getallcategories.php',
         }).then(function 
                          successCallback(response) {
             $rootScope.categories = response.data;
         }, function errorCallback(response) {
             console.log(response);
         })
     }

     if ($scope.schools == undefined) {
         $http({
             method: 'GET',
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/generalscripts/getallschools.php',
         }).then(function
                           successCallback(response) {
             $rootScope.schools = response.data;
         }, function errorCallback(response) {
             $rootScope.schools = [];
         })
     }

     if ($scope.campuses == undefined) {
         $http({
             method: 'GET',
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/generalscripts/getallcampuses.php',
         }).then(function 
                           successCallback(response) {
             $rootScope.campuses = response.data;
         }, function errorCallback(response) {
             $rootScope.campuses = [];
         })
     }
     /*SUGGESTIONS*/












        
      $http.get('http://127.0.0.1/zusp/server/zumessangerget.php')
         .success(function (data) {
          $scope.announcements = data;
        console.log($scope.announcements);    
       });      
  

  
   
 $scope.postmessage = function (frm) {


     if (frm.campus == undefined) {
         var campus = "ALL"
     } else {
         var campus = frm.campus.description.id
     }

     if (frm.category == undefined) {
         var category = "ALL"
     } else {
         var category = frm.category.description.id
     }

     if (frm.course == undefined) {
         var course = "ALL"
     } else {
         var course = frm.course.description.prog_code
     }

     if (frm.school == undefined) {
         var school = "ALL"
     } else {
         var school = frm.school.description.id
     }

     if ($('#file')[0].files[0] == undefined) {
         $rootScope.file = false;
     } else {
         $rootScope.file = $('#file')[0].files[0];
     }

     var adm = localStorage.getItem("adm_no");
     var name = localStorage.getItem("Full_Name");

     $scope.data1 = [{
         "course": course,
         "campus": campus,
         "category": category,
         "school": school,
         "title": frm.title,
         "body": frm.message,
         "sendername": name,
         "senderid": adm
     }];

     $scope.data = JSON.stringify($scope.data1);


     var formData = new FormData();


     if ($rootScope.file != false) {
         $('#loader').toggleClass('hidden');
         formData.append('file', $scope.data);
         formData.append('file', $('#file')[0].files[0]);
         $.ajax({
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/noticeboard/post.php',
             type: 'POST',
             data: formData,
             processData: false,
             contentType: false,
             success: function (data) {
                 console.log(data);
                 $('#loader').toggleClass('hidden');
                 $('#success').toggleClass('hidden');
                 $http.get('http://127.0.0.1/zusp/server/zumessangerget.php')
             .success(function (data) {
                 $scope.announcements = data;
                 console.log($scope.announcements);
             });
             }, error: function (jqXHR, textStatus, errorThrown) {
                 $('#loader').toggleClass('hidden');
                 $('#error').toggleClass('hidden');
                 console.log(textStatus);
             }
         });
     } else {


         $('#loader').toggleClass('hidden');

         formData.append('file', $scope.data);
         $.ajax({
             url: 'http://127.0.0.1/z.u.s.padmin/server/scripts/noticeboard/post.php',
             type: 'POST',
             data: formData,
             processData: false,
             contentType: false,
             success: function (data) {

                 $http.get('http://127.0.0.1/zusp/server/zumessangerget.php')
                  .success(function (data) {
                      $scope.announcements = data;
                      console.log($scope.announcements);
                  });
                 console.log(data)
                 if (data == 1) {
                     /*data was successfully inserted*/
                     $('#loader').toggleClass('hidden');
                     $('#success').toggleClass('hidden');

                 } else {
                     $('#loader').addClass('hidden');
                     $('#error').toggleClass('hidden');
                 }

             },
             error: function (data) {
                 /**unable to reach server for some reason*/
                 console.log(data)
             }

         });
     }
 }
   
 $rootScope.resetAlerts = function () {
     console.log("hahaha");
     $('#success').toggleClass('hidden');
 }
   
   
   
   
   
   
   
   
        
    }
    else
    {
    $state.transitionTo('login')    
    }

})