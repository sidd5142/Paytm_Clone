var ip = "https://10.21.81.234:8000/";

app.controller('AccountController',function($scope,$http,$window,$state){

    $scope.AddAccount = function(){
    
    var formdata = new FormData();
        formdata.append('photo', image)
        formdata.append('aadhaar_card', addhar_image)
        formdata.append('pan_card', pan_image)
        formdata.append('phone', $scope.number)
        formdata.append('Aadhar_num', $scope.aadharnumber)
        formdata.append('Pan_num', $scope.pannumber)
        formdata.append('marital_status', $scope.status)
        formdata.append('nominee', $scope.nominee)
        formdata.append('nominee_phoneno', $scope.nomineenumber)

    $http.post(ip + 'add_account', formdata, {
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
})