var message = [];
app.controller('MessageController',function($scope,$http,$window,$state){
    $scope.bills = {};
    $http.get(ip + 'messages', {
        withCredentials:true,
    })
    .then(function(response){
        console.log(response)
        $scope.bills = response.data;

        $scope.send = function(split){
            var msg = {
               pers : split
            }
        $http.get(ip + 'individual_messages', { params : msg,
            withCredentials:true
        })
        .then(function(response){
            console.log(response)
            message = response.data;
            $state.go('Data')
        })
        .catch(function(error){
            console.log(error)
        })
      }

    })
    .catch(function(error){
        console.log(error)
    })
})

var outcome = [];
app.controller('DataController',function($scope,$http,$window,$state){

    $scope.outcome = message
    console.log($scope.outcome)

    
})

var option_method = {};
app.controller('TransactionController',function($scope,$http,$window,$state){

    $http.get(ip + 'increment_wallet', {
        withCredentials:true
    })
    .then(function(response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
        Swal.fire({
            position: 'centre',
            icon: 'error',
            title : 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
          })
    })

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

    $scope.ContinuePhone = function(){
        $http.get(ip + 'continue1' , {
        withCredentials: true 
       })
      .then(function(response){
        console.log(response.data)
        if(response.data === '2')
        {
            console.log("mesg")
            $scope.payment_option = true;
        }
        else {
            console.log("else")
            $scope.payment_option = false;
            $scope.option = 1
        }
      })
      .catch(function(error){
        console.log(error)
      })  
    }  

     $scope.PhonePay = function(){
        console.log($scope.pin)
        console.log($scope.amount)
 
         var info = {
                pin : $scope.pin,
                amount : $scope.amount,
                to : $scope.number,
                method : $scope.option
            }
 
        console.log(info)
 
        $http.get(ip + 'transaction', { params : info,
         withCredentials: true
        })
        .then(function(response){
         console.log(response.data)
         $scope.cashbacks = response.data
        //  console.log(response.data.cashback)
         Swal.fire({
             icon: 'success',
            //  title: 'Cashback Earned...',
             title: 'Cashback Received : ' + response.data[0].cashback,
            //  text: 'Cashback:' + response.data
          } )
          $state.reload('Dashboard.Transaction')
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


