app.controller('MessageController',function($scope,$http,$window,$state){
})

app.controller('DataController',function($scope,$http,$window,$state){
})

app.controller('TransactionController',function($scope,$http,$window,$state){

    // $http.get(ip + 'show_coupons' , {
    //     withCredentials:true
    // })
    // .then(function(response){
    //     console.log(response)
    // })
    // .catch(function(error){
    // console.log(error)

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


     // By a number

     $scope.PhonePay = function(){
        console.log($scope.pin)
        console.log($scope.amount)
        // console.log(scan_number)
 
        var data = {
         pin : $scope.pin,
         amount : $scope.amount,
         to : $scope.number
        }
 
        console.log(data)
 
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
 })


