// var ip = "https://10.21.81.234:8000/";


app.controller('BankController',function($scope,$http,$window,$state)
{
    // $scope.bank = function(){
        var na = {
            value : 'Bank Name'
        }
    
        $http.get(ip + 'dropdown', { params : na,
            withCredentials:true
        })
        .then(function(response) {
            console.log(response)
            $scope.account = response.data
            // $state.go('CreatePin')
            $scope.bank = function(banks){
                var naam = {
                    value1 : banks,
                    value : 'Bank Name'
                }
                console.log(naam)
                $http.get(ip + 'branch_name', { params : naam ,
                    withCredentials:true
                })
                .then(function(response) {
                    console.log(response)
                    $scope.saakha = response.data
                })
                .catch(function(error) {
                    console.log(error)
                })  
            }
        })
        .catch(function(error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text : error.data.message,
                showConfirmButton: false,
                timer: 2000
            })
        })   
    // } 
    

    $scope.details = function(){
    var info = {
        UPI_number : $scope.number,
        bank_name : $scope.banks,
        branch_name : $scope.branches,
        account_number : $scope.account_number,
        account_type : $scope.type,
        IFSC_code : $scope.ifsc
    }

    console.log(info)

        $http.post(ip + 'link_account', info,{
            withCredentials:true
        } )
        .then(function(response) {
            console.log(response)
            Swal.fire({
                icon: 'success',
                title: 'Details Added',
                text : response.data.message,
                showConfirmButton: false,
                timer: 2000
            })
            $state.go('CreatePin')
        })
        .catch(function(error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text : error.data.message,
                showConfirmButton: false,
                timer: 2000
            })
        })    
    }
});

app.controller('PinController',function($scope,$http,$window,$state){

    $scope.setpin = function(){

    if($scope.pin === $scope.confpin){    
    
    $http.post(ip + 'pin', {pin : $scope.pin}, {
        withCredentials:true
    })
    .then(function(response) {
        console.log(response)
        Swal.fire({
            icon: 'success',
            title: 'Pin Created Successfully',
            text : response.data.message,
            showConfirmButton: false,
            timer: 2000
        })
        $state.go('PayHome')
    })
    .catch(function(error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text : error.data.message,
            showConfirmButton: false,
            timer: 2000
        })
    })
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Pin not same',
            // text : error.data.message,
            showConfirmButton: false,
            timer: 2000
        })
    }

}
})

var detailed = [];

app.controller('TransactionDetailController',function($scope,$http,$window,$state){
    $scope.loader = true;
    $scope.details = [];

    console.log('TransactionControlle')
    $http.get(ip + 'Payment_history', {
        withCredentials:true
    })
    .then(function(response) {
        console.log(response)
        $scope.loader=false;
        $scope.details = response.data;
        console.log($scope.details)

        $scope.redirect = function(detail){
            var data = {
                pers : detail.to,
                id : detail.id
            }
            console.log(data)
            $http.get(ip + 'individual_paymenthist', { params: data,
                withCredentials:true
            })
            .then(function(response) {
                console.log(response)
                detailed = response.data
                $state.go('History')
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    })
    .catch(function(error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Something went wrong',
            text : error.data.message,
            showConfirmButton: false,
            timer: 2000
        })
    })
// }    
})


app.controller('HistoryController',function($scope,$http,$window,$state){

    $scope.detail = detailed
    console.log($scope.detail)
})


 // 9524485485
