angular.module('units.controller', ["angucomplete-alt"]) 
.controller('unitregCtrl', function ($scope,$filter, ItemsModel,filterFilter, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
    
       $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
/*************************************** */
 if($rootScope.authed === 2)
 {
     $('#compulsorySubmit').addClass("disabled");

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


     $scope.getUnits = function (frm) {
        $('#getunitssubmit').addClass('hidden');
        $('#getunitloader').toggleClass('hidden');
        $rootScope.adm = localStorage["adm_no"];
        $rootScope.course = frm.ccode.description.prog_code;
        $rootScope.year = frm.year;
        $rootScope.sem = frm.sem;
        var ccode = frm.ccode.description.prog_code;


      
        $http({
            method: 'GET',
            url: 'http://127.0.0.1/z.u.s.pclient/server/regUnitget.php',
            params:{
                semester: frm.sem,
                course_code: ccode,
                year: frm.year
            }

        }).success(function (res) {
            $rootScope.uns = res;
            $('#getunitssubmit').removeClass('hidden');
            $('#getunitloader').toggleClass('hidden');
            $('#compulsorySubmit').removeClass("disabled");
            if (res.length > 0) {
                $('#getunitsuccess').toggleClass('hidden');
            }
            else {
                $('#getuniterror').toggleClass('hidden');
            }
 

        }).error(function (error) {
            alert(error);
        });
    }

    


    $scope.insertcompulsoryUnits = function () {
      
        $('#compulsorySubmit').addClass('hidden');
        $('#compulsoryloader').toggleClass('hidden');
        var compuls = $filter('filter')($rootScope.uns, { ELECTIVE: 'NO' });
        var compulslength = compuls.length;
        var name = localStorage["Full_Name"];
        for (var i = 0; i < compulslength; ++i) {           
            compuls[i].adm_no = $scope.adm;
            compuls[i].stdnt_name = name;
             var formData = {
                    semester: compuls[i].semester,
                    course_code: compuls[i].prog_code,
                    year: compuls[i].year,
                    adm_no: compuls[i].adm_no,
                    unit_code: compuls[i].unit_code,
                    unit_name: compuls[i].unit_name,
                    stdnt_name: compuls[i].stdnt_name,
                };
                             
                var postData = 'myData=' + JSON.stringify(formData);
                $http({
                    method: 'POST',
                    url: 'http://127.0.0.1/z.u.s.pclient/server/regUnitPost.php',
                    data: postData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        
                }).success(function (res) {
                    console.log(res);
                    $rootScope.res =res;
                    
                }).error(function (error) {
                    console.log(error);
                });

        }
        setTimeout(function () {

            if ($rootScope.res == 0) {
                $('#compulsoryloader').toggleClass('hidden');
                $('#compulsorySubmit').removeClass('hidden');
                $('#compulsoryerror').toggleClass('hidden');
            } else {
                $('#compulsoryloader').toggleClass('hidden');
                $('#compulsorySubmit').removeClass('hidden');
                $('#compulsorysuccess').toggleClass('hidden');
            }



        }, 3000);

 

    }    
       
   
     
    $scope.insertElectives = function (item) {
        $scope.loader = true;
        var name = localStorage["Full_Name"];
        var formData = {
            semester: $rootScope.sem,
            course_code: item.prog_code,
            year: $rootScope.year,
            adm_no:$rootScope.adm,
            unit_code: item.unit_code,
            unit_name: item.unit_name,
            stdnt_name: name,
        };

        var postData = 'myData=' + JSON.stringify(formData);
        $http({
            method: 'POST',
            url: 'http://127.0.0.1/z.u.s.pclient/server/regUnitPost.php',
            data: postData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function (res) {
            $scope.loader = false;
            $rootScope.rez = res;
            console.log(res);

        }).error(function (error) {
            console.log(error);
        });

    }



    $scope.resetelectiveres = function () {
        $scope.rez = null;
    }

     } 


    else
    {
    $state.transitionTo('login')    
    }
   
})