// var ip = "https://10.21.81.234:8000/";

app.controller('HomePageController',function($scope,$http,$window,$state){

    // $scope.signin = function(){
    //     console.log("Signing in...");
    //     $('#myModal').modal('show');
    // }
     // to submit otp

})


app.controller('LogInController',function($scope,$http,$window,$state){

    $http.get(ip + 'login_page', {
        withCredentials: true
    })
    .then(function(response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
        $state.go('Dashboard.PayWind')
    })

    $scope.otp = function(){

        if($scope.number)
        {
            var formdata = {
            phone:$scope.number
            }
            $scope.loader = true;
            $http.post(ip + 'otp', formdata, {
            withCredentials:true
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
              $scope.loader = false;
              $scope.showotp = true

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
              $scope.loader = false;
        })
        }
        else{
            Swal.fire({
                position: 'centre',
                icon: 'error',
                // title: response.data.message,
                title : 'Fields are Empty!!',
                showConfirmButton: false,
                timer: 1500
              })  
        }
    }

    $scope.submit = function(){

        var number = {
            phone : $scope.number,
            otp : $scope.otpverify
        }

        console.log(number)

        if($scope.otpverify)
        { 

        $http.post(ip + 'confirm_otp', number , {
            withCredentials: true
        })
        .then(function(response){
            console.log(response)
            $state.go('Dashboard.BankAccount')
        })
        .catch(function(error){
            console.log(error)
            Swal.fire({
                position: 'centre',
                icon: 'error',
                // title: error.data.message,
                title : 'Something went wrong',
                showConfirmButton: false,
                timer: 1500
              })  
        })
    }
    else{
        Swal.fire({
            position: 'centre',
            icon: 'error',
            // title: error.data.message,
            title : 'Fill the inputs first',
            showConfirmButton: false,
            timer: 1500
          })
      }
  }
})