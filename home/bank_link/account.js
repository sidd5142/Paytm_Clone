// var ip = "https://10.21.81.234:8000/";


app.controller('BankController',function($scope,$http,$window,$state){



    $scope.Add = function(){
    var info = {
        'UPI_number' : $scope.number,
        'branch_name' : $scope.branch,
        'account_number' : $scope.account_number,
        'account_type' : $scope.account_type,
        'IFSC_code' : $scope.ifsc
    }

    console.log(info)

        $http.post(ip + 'link_account', info,{
            withCredentials:true
        } )
        .then(function(response) {
            console.log(response)
            $state.go('CreatePin')
        })
        .catch(function(error) {
            console.log(error)
        })    
    }
});

app.controller('PinController',function($scope,$http,$window,$state){

    $scope.setpin = function(){
    
    $http.post(ip + 'pin', {pin : $scope.pin}, {
        withCredentials:true
    })
    .then(function(response) {
        console.log(response)
        $state.go('PayWind')
    })
    .catch(function(error) {
        console.log(error)
    })
 }
})

app.controller('TransactionController',function($scope,$http,$window,$state){
})

app.controller('HistoryController',function($scope,$http,$window,$state){
})


 // 9524485485
