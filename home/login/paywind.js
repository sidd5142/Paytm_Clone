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

var count = 1; 
var amount = 0;  
var names = [];
var info = {};
var numbers = [];

app.controller('BillController',function($scope,$http,$window,$state){
    $scope.contacts = [];
    $scope.numbers = [];

    $scope.number = "";

    // if($scope.number)
    // {
        console.log("yes")
        $scope.submit = function(){
        // count++;
        if($scope.number)
        {
        $scope.contacts.push(
            $scope.number            
        );
    count = $scope.contacts.length+1;
    amount = $scope.rupees

    $scope.number= "";

    names = $scope.contacts;

    var equal = amount/count;
    var data = {
        UPI : $scope.contacts,
        amount : amount,
        no : count, 
        equal : equal    
    }
    info = data

    $scope.Continue = function(){
        $http.get(ip + 'show_data', { params : data,
            withCredentials: true
        })
        .then(function(response){
            console.log(response)
            // console.log(info)
            $state.go('SplitBillPayment')
            $scope.splitdata = response.data;
            numbers = $scope.splitdata
            count=0;
        })
        .catch(function(error){
            console.log(error)
        })
    }
    // } 
 } 
 else{
    Swal.fire({
        icon: 'error',
        title: 'Some fiels are missing...',
        showConfirmButton: false,
        timer: 1500
        // text: error
    })
 }
}
    
    $scope.removeContactField = function(index){ 
       $scope.contacts.splice(index, 1);
    };
})


  app.controller('PaymentController',function($scope,$http,$window,$state){
    $scope.bankers = [];
    //  var equal = amount/count;
    //  console.log(numbers)
    console.log(info)
    $scope.bankers = info
    console.log($scope.bankers)
    $scope.amounts = numbers
    // console.log($scope.amounts)
    
        var datas = {
            UPI : info.UPI,
            amount : info.amount
        }
    console.log(datas)
    $scope.paid = function(){
        $http.get(ip + 'show_data', { params : datas,
            withCredentials: true
        })
        .then(function(response){
            console.log(response)
            // console.log(info)
            // $state.go('SplitBillPayment')
        })
        .catch(function(error){
            console.log(error)
        })
    }
  })

  app.controller('DashboardController',function($scope,$http,$state){

    $scope.logout = function(){
        $http.post(ip + 'logout1', {
            withCredentials : true
        })
        .then(function(response){
            console.log(response)
            $state.go('PayHome')
        })
        .catch(function(error){
            console.log(error)
        })
    }

    $scope.number = '9569673877'
     
    var qrText = $scope.number

        var qrcode = new QRCode(document.getElementById("scan"), {
        text: qrText,
        width: 130,
        height: 130
    });
    // }
    $scope.balance = async function(){
        console.log('balance')
        const { value: pass } = await Swal.fire({
            title: 'Input UPI PIN',
            input: 'password',
            inputLabel: 'Your UPI PIN',
            inputPlaceholder: 'Enter your PIN',
          })
          
          if (pass) {
            // Swal.fire(`Entered email: ${email}`)
            var pins = {
                pin : pass
            }
        
            $http.get(ip + 'check_balance' , {params : pins ,
            withCredentials: true 
            })
            .then(function(response){
                console.log(response)
                $scope.money = response.data
                console.log($scope.money)
                Swal.fire(`Your Account Balance is _____: &#x20b9; ${$scope.money}`)
            })
            .then(function(error){
                console.log(error)
            })            
          }
      }

      $scope.pin = async function(){
        const { value: password } = await Swal.fire({
            title: 'Input UPI Pin',
            input: 'password',
            inputLabel: 'Your UPI PIN',
            inputPlaceholder: 'Enter your UPI PIN'
          })
          
          if (password) {

            var num = {
                pin : password
            }

            $http.get(ip + 'edit_pin', { params : num ,
            withCredentials:true 
            })
            .then(function(response)
            {
                console.log(response)
                $state.go('CreatePin')
            })
          }
      }
  })

  app.controller('CashbackController',function($scope,$http,$window,$state){

    $scope.coupons = {};

    $http.get(ip + 'show_coupons', {
        withCredentials : true
    })
    .then(function(response){
        console.log(response)
        $scope.coupons = response.data
        console.log($scope.coupons)
    })
    .catch(function(error){
        console.log(error)
    })
  })