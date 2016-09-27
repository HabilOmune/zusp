angular.module('examreg.controller', ["angucomplete-alt"]) 

.controller('examregCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
   /************************************** */ 
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
    $scope.checkeligibility = function () {
        $('#submit1').addClass('hidden');
        $('#loader1').removeClass('hidden');

        var adm = localStorage.getItem("adm_no");
     
     
        if (adm != undefined) {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1/z.u.s.pCLIENT/server/examregClear.php',
                params: {
                    course_code: JSON.stringify(adm),
                },
            }).then(function 
      successCallback(response) {          
                $scope.bal = response.data[0].balance;            
                    $('#step1').addClass('animated flipOutY');
                    $('#step1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        $('#step1').slideUp('hidden');
                    });
                    console.log($scope.bal)
                    if ($scope.bal == 0) {
                        $('#step2').removeClass('hidden');
                    }

               
            }, function errorCallback(response) {
                console.log(response);
            })
        }

        else {
            alert("could not find admisssion number,log out and login afresh");
        }
    }

    $scope.selectexam = function (frm) {
        if (frm.endsem == undefined) {
            $rootScope.examtype = frm.endyear;
        } else {
            $rootScope.examtype = frm.endsem;
        }

        $('#step2').slideToggle('hidden');
        $('#step3').removeClass('hidden');
    

    }

    $scope.getregisteredunits = function (frm) {
        $('#loader2').removeClass('hidden');
        $rootScope.year = frm.year;
        $rootScope.semester =  frm.semester;
        $rootScope.adm = localStorage.getItem("adm_no");
        var adm = $rootScope.adm;
        if (adm != undefined) {
            $http({
                method: 'GET',
                url: 'http://127.0.0.1/z.u.s.pCLIENT/server/examreggetunits.php',
                params: {
                    adm_no: adm,
                    year: frm.year,
                    semester:frm.semester,
                },
            }).then(function
               successCallback(response) {
                $rootScope.rgunits = response.data;
                $rootScope.reglength = response.data.length;
                $('#loader2').addClass('hidden');
                $('#step3').slideToggle('hidden');
                $('#step4').removeClass('hidden');
            }, function errorCallback(response) {
                console.log(response);
            })
        }

    }

    $scope.registerexam = function (rgunits) {
        $('#back4').addClass('hidden');
        $('#submit4').addClass('hidden');
        $('#loader3').removeClass('hidden');
        $rootScope.cours = rgunits[0].course_code;
    
            $http({
                method: 'GET',
                url: 'http://127.0.0.1/z.u.s.pCLIENT/server/registerexam.php',
                params: {


                    adm : $rootScope.adm,
                    year : $rootScope.year,
                    semester: $rootScope.semester,
                    exam: $rootScope.examtype,
                    course: $rootScope.cours,


                },
            }).then(function 
               successCallback(response) {
                console.log(response.data);
                $scope.re = response.data;
                $('#step4').slideToggle('hidden');
                $('#step5').removeClass('hidden');
            }, function errorCallback(response) {
                console.log(response);
            })
        














    }



    $scope.backtostep2 = function () {
        $('#step2').slideToggle('hidden');
        $('#step3').addClass('hidden');
    }

    $scope.backtostep3 = function () {
        $('#step3').slideToggle('hidden');
        $('#step4').addClass('hidden');
    }
})