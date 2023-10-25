app.controller('WalletController',function($scope,$http,$window,$state){

   $scope.otp = function(){
    if($scope.number)
    {
        var data = {
        phone:$scope.number
        }
   
        $http.post(ip + 'otp_wallet', data, {
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
          $scope.showotp = true

    })
    .catch(function(error){
        console.log(error)
    })
    }
    else{
        Swal.fire({
            position: 'centre',
            icon: 'error',
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

    $http.post(ip + 'confirmotp_wallet', number , {
        withCredentials: true
    })
    .then(async function(response){
        console.log(response)

        const { value: amount } = await Swal.fire({
            title: 'Enter amount you want to add',
            input: 'text',
            inputLabel: 'Amount',
            inputPlaceholder: 'Enter Amount'
          })
          
          if (amount) {
            var num = {
                amount1 : amount
            }
             console.log(num)
            $http.post(ip + 'activate_wallet', num, {
            withCredentials:true 
            })
            .then(function(response)
            {
                console.log(response)
            })
            // Swal.fire(`Amount Added: ${amount}`)
          }
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

})


app.controller('WalletTransactionController',function($scope,$http,$window,$state){
})

