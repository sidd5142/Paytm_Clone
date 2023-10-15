var ip = "https://10.21.81.234:8000/";
app.controller('HomeController',function($scope,$http,$window,$state){

    // to generate the otp

    $scope.otp = function(){

        if($scope.number)
        {

            $scope.showotp = true
            var formdata = {
            phone:$scope.number
            }
       
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
        })
        .catch(function(error){
            console.log(error)
        })
        }
        else{
            window.alert("Input Number")
        }
    }

     // to submit otp

    $scope.submit = function(){

        var number = {
            phone : $scope.number,
            otp : $scope.otpverify
        }

        console.log(number)

        $http.post(ip + 'confirm_otp', number , {
            withCredentials: true
        })
        .then(function(response){
            console.log(response)
            $state.go('BankAccount')
        })
        .catch(function(error){
            console.log(error)
        })
    }

    // to scan a qr code
    var data = {};

    $scope.payment = function () {

        const videoElement = document.getElementById('scanner-video');
        videoElement.style.display = 'block';

        const scanner = new Instascan.Scanner({ video: videoElement });

        scanner.addListener('scan', function (content) {
        data = document.getElementById('result').textContent = content;
            
            videoElement.style.display = 'none';
        });

        // Start scanning
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
            } else {
                console.error('No cameras found.');
            }
        });
    };

    // to pay the amount 
    $scope.pin = function () {
        console.log($scope.amount)
        
        $http.post(ip + 'valid_amount', {'amount' : $scope.amount}, {
            withCredentials: true
        })
        .then(function(response){
                    console.log(response)
                })
        .catch(function(error){
                    console.log(error)
                })   
        
        // $http.post(ip + '', data , {
        //     withCredentials: true
        // })
        // .then(function(response){
        //             console.log(response)
        //             $state.reload('Paywind')
        //         })
        // .catch(function(error){
        //             console.log(error)
        //         })       
    }

    $scope.FinalPay = function(){
       console.log($scope.pin)
       console.log($scope.amount)

       var data = {
        'pin' : $scope.pin,
        'amount' : $scope.amount,
        'date': dashSquare,
        'time' : time,
        'upi_number' : $scope.result
       }


       $http.post(ip + 'check_pin', data, {
        withCredentials: true
       })
       .then(function(response){
        console.log(response)
        })
        .catch(function(error){
        console.log(error)
        })
    }
})

   

app.controller('BillController',function($scope,$http,$window,$state){

    $scope.contacts = [];
    $scope.numbers = [];

    $scope.number = "";

    $scope.submit = function(){
        $scope.contacts.push({
            numbers : $scope.number
    });

    $scope.number= "";
};
    $scope.removeContactField = function(index){ 
       $scope.contacts.splice(index, 1);
    };

    // $scope.continue=function(){
    //     $http.post(ip + 'splitbill', {
    //         withCredentials:true
    //     })
    //     .then(function(response){
    //         console.log(response)
    //     })
    //     .catch(function(error){
    //         console.log(error)
    //     })
    // }
    // $scope.continue = function(){
    //     $state.go('SplitBillPayment');
    // }
})



   