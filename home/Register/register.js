var ip = "https://10.21.81.234:8000/";

app.controller('RegisterController',function($scope,$http,$window,$state){
  
  $scope.submit = function(){

       
        var formdata = new FormData();
        
        formdata.append('firstname', $scope.firstname)
        formdata.append('lastname', $scope.lastname)
        formdata.append('email', $scope.email)
        formdata.append('dob', $scope.dob)
        formdata.append('phone_number', $scope.contact)
        formdata.append('gender', $scope.gender)
        formdata.append('password', $scope.password)
        formdata.append('confirmpassword', $scope.confpassword)

        // if($scope.Register)
        // {
        console.log(formdata)

        $http.post(ip + 'register/', formdata,{
          withCredentials:true,
          // headers: {
          //   'Content-Type': undefined
          // }
        })
        .then(function (response) {
          console.log(response.data)
          Swal.fire({
            position: 'centre',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.log(error)
        })
      }
      // else{
      //   console.log("FIll the fields")
      // }
    
    
    
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