app.controller('HomeController',function($scope,$http,$window,$state){

    // to generate the otp

    $scope.otp = function(){

        if($scope.number)
        {

            var formdata = {
            phone:$scope.number
            }
       
            $http.post(ip + 'otp', formdata, {
            withCredentials:true
        })
        .then(function(response){
            console.log(response)
            $scope.showotp = true
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
    var scan_number = {};

    $scope.payment = function () {

        const videoElement = document.getElementById('scanner-video');
        videoElement.style.display = 'block';

        const scanner = new Instascan.Scanner({ video: videoElement });

        scanner.addListener('scan', function (content) {
        scan_number = document.getElementById('result').textContent = content;
            
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
    // $scope.pin = function () {
    //     console.log($scope.amount)

    //     var amt = {
    //         'amount' : $scope.amount,
    //         'to' : scan_number
    //     }
        
    //     $http.post(ip + 'valid_amount', amt, {
    //         withCredentials: true
    //     })
    //     .then(function(response){
    //                 console.log(response)
    //             })
    //     .catch(function(error){
    //                 console.log(error)
    //             })   
        
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
    // }

    $scope.FinalPay = function(){
       console.log($scope.pin)
       console.log($scope.amount)
       console.log(scan_number)

       var data = {
        pin : $scope.pin,
        amount : $scope.amount,
        // 'date': 2023-10-15,
        // 'time' : 9.30 ,
        to : scan_number
       }

       console.log(data)

       if($scope.pin && $scope.amount)
       {
       $http.get(ip + 'transaction', { params : data,
        withCredentials: true
       })
       .then(function(response){
        console.log(response.data)
        console.log(response.data.cashback)

        Swal.fire({
            icon: 'success',
            title: 'Cashback Earned...',
            text: response.data
         } )
         $state.reload('Dashboard.PayWind')
        })
        .catch(function(error){
        console.log(error)
        Swal.fire({
            icon: 'error',
            // title: 'Insufficient...',
            text: error.data.message
         } )
        })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Some fiels are missing...',
            text: error
        })
    }
  }
})

var count = 0; 
var amount = 0;  
var names = [];
var info = {};

app.controller('BillController',function($scope,$http,$window,$state){
    $scope.contacts = [];
    $scope.numbers = [];

    $scope.number = "";

    $scope.submit = function(){
        count++;
        $scope.contacts.push({
            numbers : $scope.number
    });
    amount = $scope.rupees

    $scope.number= "";

    names = $scope.contacts;

    var equal = amount/count;
    var data = {
        names : $scope.contacts,
        amount : amount,
        equal : equal        
    }
    info = data

};


    $scope.Continue = function($index){
        // $scope.number = $index
        console.log(count);
        console.log(amount);
        // console.log($scope.contacts);
        // console.log(amount/count);
        $state.go('SplitBillPayment')
    }
    

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


  app.controller('PaymentController',function($scope,$http,$window,$state){
    $scope.bankers = [];
     var equal = amount/count;
     console.log(equal);
    //  var data = response
    $scope.bankers = info
     console.log($scope.bankers);

    //  console.log(info);

  })



  app.controller('DashboardController',function(){
  })


  app.controller('CashbackController',function($scope,$http,$window,$state){
  })