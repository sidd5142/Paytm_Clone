
app.controller("RegisterController", function ($scope, $http, $window, $state) {
  $scope.validatePassword = function () {
    $scope.passwordMismatch = $scope.password !== $scope.confpassword;
  };

  $scope.validateEmail = function () {
    // Regular expression for email validation
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test($scope.email)) {
      $scope.emailIsValid = true;
    } else {
      $scope.emailIsValid = false;
    }
  };

  $scope.updateDate = function () {
    var selectedDate = new Date($scope.date);
    if (selectedDate) {
      var minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);
      if (selectedDate < minDate) {
        var year = selectedDate.getFullYear();
        var month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
        var day = selectedDate.getDate().toString().padStart(2, "0");
        $scope.date = year + "-" + month + "-" + day;
      } else {
        $scope.date = null;
      }
    } else {
      $scope.date = null;
    }
  };

  $scope.title1 = function () {
    var data = {
      value: "Prefix",
    };
    $http
      .get(ip + "dropdown", { params: data, withCredentials: true })
      .then(function (response) {
        console.log(response);
        $scope.prefix = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.gender1 = function () {
    var data = {
      value: "Gender",
    };
    $http
      .get(ip + "dropdown", { params: data, withCredentials: true })
      .then(function (response) {
        console.log(response);
        $scope.gender = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.Register = function (valid) {
    var pass = $scope.password;
    var confpass = $scope.confpassword;
    var validemail = $scope.emailIsValid;

    var formdata = {
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      email: $scope.email,
      dob: $scope.date,
      phonenumber: $scope.contact,
      gender: $scope.genders,
      password: $scope.password,
      confirmpassword: $scope.confpassword
    };

    console.log(formdata);

    if (pass === confpass && validemail) {
      $http
        .post(ip + "register", formdata, {
          withCredentials: true,
        })
        .then(function (response) {
          console.log(response.data);
          Swal.fire({
            position: "centre",
            icon: "success",
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          $state.go("AddAccount");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            position: "centre",
            icon: "error",
            title: error.data.error,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect password or invalid email",
      });
    }
   
  };
  
});

app.directive("fileUpload", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attrs, ngModel) {
      element.bind("change", function (event) {
        var file = event.target.files[0];
        scope.$apply(function () {
          ngModel.$setViewValue(file);
        });
      });
    },
  };
});

app.controller("AccountController", function ($scope, $http, $window, $state) {
  $scope.marital = function () {
    var status = {
      value: "Marital Status",
    };
    $http
      .get(ip + "dropdown", { params: status, withCredentials: true })
      .then(function (response) {
        console.log(response.data);
        $scope.status1 = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.AddAccount = function () {
    var formdata = new FormData();
    formdata.append("photo", $scope.userimage);
    formdata.append("aadhaar_card", $scope.aadhaar);
    formdata.append("pan_card", $scope.pan);
    formdata.append("phonenumber", $scope.number);
    formdata.append("aadhaar_card_no", $scope.aadharnum);
    formdata.append("pan_card_no", $scope.pan_num);
    formdata.append("marital_status", $scope.status);
    formdata.append("nominee", $scope.nominee);
    formdata.append("nominee_phoneno", $scope.nomineenumber);
    formdata.append("address", $scope.address);

    console.log(formdata);

    $http
      .post(ip + "create_account", formdata, {
        withCredentials: true,
        headers: {
          "Content-Type": undefined,
        },
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
          position: "centre",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        $state.go("CreatePin");
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          position: "centre",
          icon: "error",
          title: error.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
});
