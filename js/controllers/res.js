angular.module('results.controller', []) 

.controller('resCtrl', function ($scope, ItemsModel, AuthService, calenderService, $http, $state, $rootScope, $compile, $timeout, uiCalendarConfig) {
   $rootScope.si=1;   
   $('.button-collapse').sideNav('hide');      
    $scope.logout = function () {
        AuthService.signout()
    }
   /************************************** */ 

    if($rootScope.authed === 2)
    {

        $scope.name = localStorage.getItem("Full_Name");
        $scope.course = localStorage.getItem("course");
        $scope.admno = localStorage.getItem("adm_no");
   
   $scope.gettrans = function (frm) {       
       var adm1 = localStorage.getItem("adm_no");
       var adm = JSON.stringify(adm1);
       $('#loader1').toggleClass('hidden');
       $('#submit1').addClass('hidden');
           var formData = {
               semester: frm.sem,
               year: frm.year,
               adm_no: adm
           };
           var postData = 'myData=' + JSON.stringify(formData);
           $http({
               method: 'POST',
               url: 'http://127.0.0.1/zusp/server/getsemresults.php',
               data: postData,
               headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

           }).success(function (res) {
               $scope.results = res;
               $scope.length = res.length;
               console.log(res)
               $('#loader1').toggleClass('hidden');
               $('#submit1').removeClass('hidden');
           }).error(function (error) {
               console.log(error);
           });       
   }




   $scope.gettransbytime = function (frm) {
       var adm1 = localStorage.getItem("adm_no");
       var adm = JSON.stringify(adm1);
       var exam_time = JSON.stringify(frm.period);
       $('#loader2').toggleClass('hidden');
       $('#submit2').addClass('hidden');
       var formData = {
           semester: frm.semm,
           year: frm.yearr,
           adm_no: adm,
           exam_time: exam_time
       };
       var postData = 'myData=' + JSON.stringify(formData);
       $http({
           method: 'POST',
           url: 'http://127.0.0.1/zusp/server/getresultsbyperiod.php',
           data: postData,
           headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

       }).success(function (res) {
           $scope.resultsbyperiod = res;
           $scope.sem_time = exam_time;
           $scope.length2 = res.length;
           $('#loader2').toggleClass('hidden');
           $('#submit2').removeClass('hidden');

       }).error(function (error) {
           console.log(error);
       });
   }


   $scope.bysem = function() {
       $('#getbysem').toggleClass("hidden");
       $('#getbysemf').toggleClass("hidden");
   }


   $scope.bytime = function () {
       $('#getbyperiod').toggleClass("hidden");
       $('#getbyperiodf').toggleClass("hidden");
   }


   $scope.yeartrans = function () {
       
   }


     }
    else
    {
    $state.transitionTo('login')    
    }
})