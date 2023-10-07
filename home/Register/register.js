var ip = "https://10.21.81.234:8000/";

app.controller('RegisterController',function($scope,$http,$window,$state){
  
  $scope.Register = function(){

    var addhar_image = $scope.Aadhar
      var pan_image = $scope.Pan
      var image = $scope.userimage
        var formdata = new FormData();
        formdata.append('photo', image)
        formdata.append('aadhaar_card', addhar_image)
        formdata.append('pan_card', pan_image)
        formdata.append('firstname', $scope.firstname)
        formdata.append('lastname', $scope.lastname)
        formdata.append('email', $scope.email)
        formdata.append('dob', $scope.dob)
        formdata.append('phone_number', $scope.contact)
        formdata.append('password', $scope.password)
        formdata.append('confirmpassword', $scope.confpassword)
        formdata.append('address', $scope.address)
        formdata.append('nominee', $scope.nominee)
        formdata.append('nominee_phoneno', $scope.nomineenumber)

        console.log(formdata)

        $http.post(ip + 'register/', formdata,{
          withCredentials:true,
          headers: {
            'Content-Type': undefined
          }
        })
        .then(function (response) {
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
      }

    
})

app.directive('fileUpload', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
         element.bind('change', function(event) {
          var file = event.target.files[0];
          scope.$apply(function() {
            ngModel.$setViewValue(file);
          });
        });
      }
    };
 })