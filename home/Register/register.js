// var ip = "https://10.21.81.234:8000/";

app.controller('RegisterController',function($scope,$http,$window,$state){
 
  $scope.gender1 = function(){
    var data = {
      value : 'Gender'
    }
    $http.get(ip + 'dropdown' , { params : data,
      withCredentials: true
    })
    .then(function(response){
      console.log(response)
      $scope.gender = response.data
    })
    .catch(function(error){
      console.log(error)
    })
  }
  
  $scope.submit = function(){

        var formdata = {
          firstname: $scope.firstname,
          lastname: $scope.lastname,
          email: $scope.email,
          dob: $scope.dob,
          phonenumber: $scope.contact,
          gender: $scope.gender,
          password: $scope.password,
          confirmpassword: $scope.confpassword
        }

        // if($scope.Register)
        // {
        console.log(formdata)

        $http.post(ip + 'register', formdata,{
          withCredentials:true,
          
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
          $state.go('AddAccount')
        })
        .catch(function (error) {
          console.log(error)
          Swal.fire({
            position: 'centre',
            icon: 'error',
            title: error.data.message,
            showConfirmButton: false,
            timer: 1500
          })
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

 
app.controller('AccountController',function($scope,$http,$window,$state){

  $scope.marital = function(){
    var status = {
      value : 'Marital Status'
    }
    $http.get(ip + 'dropdown' , { params : status,
      withCredentials: true
    })
    .then(function(response){
      console.log(response.data)
      $scope.status1 = response.data
    })
    .catch(function(error){
      console.log(error)
    })
  }


  $scope.AddAccount = function(){
  var formdata = new FormData();
      formdata.append('photo', $scope.userimage)
      formdata.append('aadhaar_card', $scope.aadhaar)
      formdata.append('pan_card', $scope.pan)
      formdata.append('phonenumber', $scope.number)
      formdata.append('aadhaar_card_no', $scope.aadharnum)
      formdata.append('pan_card_no', $scope.pan_num)
      formdata.append('marital_status', $scope.status)
      formdata.append('nominee', $scope.nominee)
      formdata.append('nominee_phoneno', $scope.nomineenumber)
      formdata.append('address', $scope.address)

       console.log(formdata)

  $http.post(ip + 'create_account', formdata, {
      withCredentials:true,
      headers: {
          'Content-Type': undefined
        }
  })
  .then(function(response){
      console.log(response)
      Swal.fire({
          position: 'centre',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        $state.go('Dashboard.PayWind')
  })
  .catch(function(error){
      console.log(error)
      Swal.fire({
        position: 'centre',
        icon: 'error',
        title: error.data.message,
        showConfirmButton: false,
        timer: 1500
      })
  })
 }
})

