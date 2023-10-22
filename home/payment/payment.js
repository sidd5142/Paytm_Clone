app.controller('MessageController',function($scope,$http,$window,$state){
    $scope.bills = {};
    $http.get(ip + 'notification', {
        withCredentials:true,
    })
    .then(function(response){
        console.log(response)
        $scope.bills = response.data;
    })
    .catch(function(error){
        console.log(error)
    })
})

app.controller('DataController',function($scope,$http,$window,$state){
})

app.controller('TransactionController',function($scope,$http,$window,$state){

    var scan_number = 0
    $scope.payment = function(){

        var data = document.getElementById('scanner');
        data.style.display = 'block';

        let scan = new Instascan.Scanner({ video: data});
        scan.addListener('scan', function (content) {
        Scanner = document.getElementById('show').textContent = content
        data.style.display = 'none';
        scan_number = Scanner;
        });
        Instascan.Camera.getCameras().then(function(cameras){
            if(cameras.length > 0)
            {
                scan.start(cameras[0]);
            }
            else{
                console.error('No cameras found');
            }
        })
        .catch(function(error){
            console.error(error)
        })
    }

    $scope.FinalPay = function(){
        console.log($scope.pin)
        console.log($scope.amount)
        console.log(scan_number)
 
        
        var data = {
         pin : $scope.pin,
         amount : $scope.amount,
         to : scan_number
        }
        console.log(data)

        if($scope.pin)
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
            //  title: 'Inputs are missing...',
             text: 'error'
          } )
         })
        }
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Inputs are missing...',
                text: 'error'
             } )
        }
     }


     // By a number

     $scope.PhonePay = function(){
        console.log($scope.pin)
        console.log($scope.amount)
 
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
         $scope.cashbacks = response.data
        //  console.log(response.data.cashback)
 
         Swal.fire({
             icon: 'success',
            //  title: 'Cashback Earned...',
             title: $scope.cashbacks.cashback
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


