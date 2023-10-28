app.controller('WalletController',function($scope,$http,$window,$state){

   $scope.otp = function(){

    $scope.loader = true;

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
        $scope.loader = false;
        Swal.fire({
            position: 'centre',
            icon: 'success',
            title : 'Activated',
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          $scope.showotp = true

    })
    .catch(function(error){
        console.log(error)
        Swal.fire({
            position: 'centre',
            icon: 'error',
            title : error.data.message,
            showConfirmButton: false,
            timer: 1500
          })
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
                Swal.fire({
                    position: 'centre',
                    icon: 'success',
                    // title: error.data.message,
                    title : 'response.data.message',
                    showConfirmButton: false,
                    timer: 1500
                  }) 
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

    $scope.proceed = function(){

        var data = {
            amount1 : $scope.wallet_balance,
            amount2 : $scope.add
        }
    
        console.log(data)
    

    $http.post(ip + 'autoincrement_wallet', data ,{
        withCredentials:true
    })
    .then(function(response){
        console.log(response)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title : "Added",
            text : response.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
    })
    .catch(function(error){
        console.log(error)
        Swal.fire({
            position: 'centre',
            icon: 'error',
            title : 'Something went wrong',
            text : error.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
    })
}
})

app.controller('PostpaidController',function($scope,$http,$window,$state){

    $scope.validateEmail = function () {
        // Regular expression for email validation
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (emailPattern.test($scope.email)) {
          $scope.emailIsValid = true;
        } else {
          $scope.emailIsValid = false;
        }
      };


      $scope.updateDate = function () {
        var selectedDate = new Date($scope.dob);
        if (selectedDate) {
          var minDate = new Date();
          minDate.setFullYear(minDate.getFullYear() -18);
          if(selectedDate < minDate)
          {
            var year = selectedDate.getFullYear();
            var month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
            var day = selectedDate.getDate().toString().padStart(2, '0');
            $scope.dob = year + '-' + month + '-' + day;
          }
          else{ 
            $scope.dob = null;
          }
            
        } else {
            $scope.dob = null;
        }
    };
   
   
    $scope.myform = function(){
    console.log("confirm")
    var data = {
        pan : $scope.pan_number,
        aadhar : $scope.aadhaar_number,
        dob : $scope.dob,
        email : $scope.email
    }

    // if($scope.myform)
    // {
    $http.post(ip + 'confirm', data,{
        withCredentials: true
    })
    .then(async function(response){
        console.log(response)
        Swal.fire({
            position: 'center',
            icon: 'success',
            title : "Added",
            text : response.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
          const { value: otp } = await Swal.fire({
            title: 'Enter OTP',
            input: 'text',
            inputLabel: 'Your OTP',
            inputPlaceholder: 'Enter OTP'
          })
          
          if (otp) {

            var num = {
                otp : otp
            }

            $http.get(ip + 'confirm_otp', { params : num ,
            withCredentials:true 
            })
            .then(function(response)
            {
                console.log(response)
            })
    }
})
    .catch(function(error){
        console.log(error)
        Swal.fire({
            position: 'centre',
            icon: 'error',
            title : 'Something went wrong',
            text : error.data.message,
            showConfirmButton: false,
            timer: 1500
          }) 
    })
   } 
})
