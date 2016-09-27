angular.module('downloadcenter.controller', ["angucomplete-alt"])

.controller('downloadcenterCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
    
    /******************************/
    $scope.opencourseoutline = function(){
        $('#courseoutlines').toggleClass("hidden");
    }

    $scope.openrevision = function(){
        $('#courseoutlines').toggleClass("hidden");
    }
    

    $scope.openfeestructure = function(){
        $('#feestructures').toggleClass("hidden");
    }
    
    
    $scope.feestructures = function(){
            var formData = {
               target_table: "fee_structures",
           };
           
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/downloadcenterfee.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {                            
              $scope.feestructures = res;
              console.log($scope.feestructures);
           }).error(function (error) {
               console.log(error);
           });
    }  
    
    
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

          if ($scope.units == undefined) {
                  $http({
                      method: 'GET',
                      url: 'http://127.0.0.1/zusp/server/getallunits.php',
                  }).then(function
            successCallback(response) {
                      console.log("units ready");
                      $rootScope.units = response.data;
                  }, function errorCallback(response) {
                      console.log(response);
                  })
              }

    
    /*SUGGESTIONS*/
 
    $scope.courseoutline = function (frm){

        console.log()
    
          var sem = frm.sem
          var course_code = JSON.stringify(frm.ccode.description.prog_code);
          var formData = {
               target_table: "course_outlines",
               course_code: course_code,
               sem: sem,
               year: frm.year,
               unit: frm.unit.description.unit_code
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/downloadcenter.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.crsouts = res;
               console.log(res);
           }).error(function (error) {
               console.log(error);
           });   
    }
      
  
          $scope.revisionsbyschool = function () {
              $('#byschool').toggleClass("hidden");
          }

          $scope.revisionsbycourse = function () {
              $('#bycourse').toggleClass("hidden");
          }

          $scope.revisionsbytype = function () {
              $('#bytype').toggleClass("hidden");
          }

          $scope.revisionsbyunit = function () {
              $('#byunit').toggleClass("hidden");
          }





          $scope.getrevisionschool = function (frm) {


              var colname = "school";
              var search_param = frm.school.description.id;
              $http({
                  method: 'GET',
                  url: 'http://127.0.0.1/zusp/server/scripts/downloadcenter/revisionmaterial/revisionmaterialrefined.php',
                  params: {
                      column_name: colname,
                      search_param: search_param
                  },
              }).then(function 
            successCallback(response) {
                  console.log(response.data);
                  $scope.revisionrefined = response.data;

              }, function errorCallback(response) {
                  console.log(response);
              })


          }

          $scope.getrevisioncourse = function (frm) {
              var colname = "course";
              var search_param = frm.course.description.prog_code;
              $http({
                  method: 'GET',
                  url: 'http://127.0.0.1/zusp/server/scripts/downloadcenter/revisionmaterial/revisionmaterialrefined.php',
                  params: {
                      column_name: colname,
                      search_param: search_param
                  },
              }).then(function
            successCallback(response) {
                  console.log(response.data);
                  $scope.revisionrefined = response.data;

              }, function errorCallback(response) {
                  console.log(response);
              })







          }

          $scope.getrevisionunit = function (frm) {

              var colname = "unit";
              var search_param = JSON.stringify(frm.unit.description.unit_code);
              $http({
                  method: 'GET',
                  url: 'http://127.0.0.1/zusp/server/scripts/downloadcenter/revisionmaterial/revisionmaterialrefined.php',
                  params: {
                      column_name: colname,
                      search_param: search_param
                  },
              }).then(function 
            successCallback(response) {
                  console.log(response.data);
                  $scope.revisionrefined = response.data;

              }, function errorCallback(response) {
                  console.log(response);
              })












          }












   
})