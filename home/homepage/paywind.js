var ip = "https://10.21.81.234:8000/";
app.controller('HomeController',function($scope,$http,$window,$state){

    // to generate the otp

    $scope.otp = function(){

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
        })
        .catch(function(error){
            console.log(error)
        })
    }

    // to scan a qr code

    $scope.payment = function () {

        const videoElement = document.getElementById('scanner-video');
        videoElement.style.display = 'block';

        const scanner = new Instascan.Scanner({ video: videoElement });

        scanner.addListener('scan', function (content) {
            document.getElementById('result').textContent = 'QR Code Content: ' + content;
            
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
    $scope.Pay = function (amount) {
        $state.reload('Paywind')
    }
})

app.controller('BillController',function($scope,$http,$window,$state){

    $scope.contacts = [];
    $scope.numbers = [];

    $scope.number = "";

    $scope.submit = function(){

        // $scope.numbers.push(
        // $scope.input = $scope.number 
        // )

        // console.log("GOoding!");
        $scope.contacts.push({
            numbers : $scope.number
    });

    $scope.number= "";
};
    $scope.removeContactField = function(index){ 
       $scope.contacts.splice(index, 1);
    };

    // $scope.submit=function(){
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
})



   