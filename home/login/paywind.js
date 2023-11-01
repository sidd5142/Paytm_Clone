var admin = [];
var panels = [];

app.controller("HomeController", function ($scope, $http, $window, $state) {
  // $scope.$on("$locationChangeStart", function (event) {
  //   event.preventDefault();
  // });

  // to scan a qr code
  var scan_number = {};

  $scope.FinalPay = function () {
    console.log($scope.pin);
    console.log($scope.amount);
    console.log(scan_number);

    var data = {
      pin: $scope.pin,
      amount: $scope.amount,
      to: scan_number,
    };

    console.log(data);

    if ($scope.pin && $scope.amount) {
      $http
        .get(ip + "transaction", { params: data, withCredentials: true })
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.cashback);

          Swal.fire({
            icon: "success",
            title: "Cashback Earned...",
            text: response.data,
          });
          $state.reload("Dashboard.PayWind");
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            // title: 'Insufficient...',
            text: error.data.message,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Some fiels are missing...",
        text: "error",
      });
    }
  };
});

var count = 1;
var amount = 0;
var names = [];
var info = {};
var numbers = [];
var n = 0;
var pn = 0;
var amtval = [];
app.controller("BillController", function ($scope, $http, $state) {
  $scope.contacts = [];
  $scope.numbers = [];
  $scope.input = [];

  $scope.number = "";

  $scope.submit = function () {
    // count++;
    if ($scope.number) {
      $scope.contacts.push($scope.number);
      count = $scope.contacts.length;
      amount = $scope.rupees;
      console.log(count);
      $scope.number = "";

      names = $scope.contacts;

      //   var equal = amount / count;
      //     console.log($scope.contacts[n])

      //     $scope.input.push({
      //       number : $scope.contacts[n],
      //       equal : equal
      //     })
      //   var data = {
      //    UPI : $scope.input,
      //    amount : amount
      //   };
      //     n++;
      // info = data
      $scope.Continue = function () {
        var equal = amount / count;
        pn = equal;
        for (n = 0; n < count; n++) {
          console.log($scope.contacts[n]);

          $scope.input.push({
            numbers: $scope.contacts[n],
            amount: equal,
          });
          var data = {
            UPI: $scope.input,
            amount1: amount,
          };
          amtval = $scope.input;
          // n++;
          info = data;
          console.log(data);
        }
        $http
          .get(ip + "show_data", { params: data, withCredentials: true })
          .then(function (response) {
            $state.go("SplitBillPayment");
            $scope.splitdata = response.data;
            numbers = $scope.splitdata;

            count = 0;
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: error.data.message,
              showConfirmButton: false,
              timer: 2000,
            });
          });
      };
    }
    // }
    else {
      Swal.fire({
        icon: "error",
        title: "Enter Valid Mobile Number...",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // $scope.removeContactField = function (index) {
  //   $scope.contacts.splice(index, 1);
  // };
});

var earlier = 0;
var divide_amount = [];
var change_number = [];
var change_amount = [];

app.controller("PaymentController", function ($scope, $http, $window, $state) {
  $scope.bankers = [];
  $scope.paymentlist = [];
  console.log(info);
  $scope.bankers = info;
  console.log($scope.bankers);
  // earlier = $scope.bankers.UPI.equal;
  // console.log(earlier);
  $scope.amounts = numbers;

  $scope.update = function (number) {
    console.log(number.numbers);
    console.log(number.amount);
    console.log($scope.bankers.amount);
    $scope.updateamt = number.amount;
    console.log($scope.updateamt);
    console.log(n);
    if ($scope.updateamt <= $scope.bankers.amount - earlier) {
      var equalValue =
        parseFloat($scope.bankers.amount - pn) - $scope.updateamt;
      console.log(equalValue);
      var divequal = equalValue / n;
      console.log(divequal);
      // number.equal = divequal

      // number.equal = equalValue
    } else {
      Swal.fire({
        icon: "error",
        title: "Amount more than the actual amount",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // number.equal = equalValue
    console.log(number.equal);
    change_number.push({
      numbers: number.numbers,
      amount: $scope.updateamt,
    });

    // $scope.updateData = function (number, value) {
    //   console.log($scope.bankers.amount);
    //   console.log(number);
    //   console.log(earlier);
    //   console.log('value',value);
    //   console.log($scope.amount)
    //   // change_amount.push(value)
    //   // change_number.push(number)
    //   if ($scope.update <= $scope.bankers.amount - earlier) {
    //     var equalValue = parseFloat($scope.bankers.amount - earlier) - $scope.update;
    //     var divequal = equalValue / ($scope.bankers.no - 2);
    //     console.log(divequal);
    //     $scope.bankerss = divequal;
    //     // divide_amount.push(divequal);
    //     // change_amount.push(value);
    //     // change_number.push(number)
    //     change_number.push({
    //       numbers: number,
    //       amount: number,
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Amount more than the actual amount",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // };
  };

  $scope.paid = function (number) {
    $scope.contacts = [];

    var datas = {
      UPI: amtval,
      amount1: amount,
      //  UPI : number,
      //  amount : value
    };
    console.log(datas);

    $http
      .post(ip + "split_bill", datas, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Split Bill Created",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(info)
        $state.go("Dashboard.SplitBill");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});

var profiles = [];
//   var qr = "";

app.controller("DashboardController", function ($scope, $http, $state) {
  $scope.dashuser = [];
  $scope.dashpanel = [];

  const container = document.getElementById("my-Modal");
  const modal = new bootstrap.Modal(container);

  document.getElementById("signin").addEventListener("click", function () {
    modal.show();
  });
  // document.getElementById("btnSave").addEventListener("click", function () {
  //   modal.hide();
  // });

  $scope.click = function () {
    $scope.dash = {
      user: [],
      dashboard: [],
    };

    $http
      .get(ip + "dynamicpanel", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $scope.dash.user = response.data[0].user;
        $scope.dash.dashboard = response.data[1].dashboard;
        // console.log($scope.dash.user.phone_no);

        $scope.getotp = function (admin) {
          $scope.scanbtn = true;
          var qrText = admin.phone_no;
          var qrcode = new QRCode(document.getElementById("scan"), {
            text: qrText,
            width: 110,
            height: 110,
          });
        };
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  $scope.logout = function () {
    $http
      .get(ip + "logout1", {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response);
        $state.go("PayHome");
        Swal.fire({
          icon: "success",
          title: "You are successfully logged out",
          text: response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // }
  $scope.balance = async function () {
    console.log("balance");
    const { value: pass } = await Swal.fire({
      title: "Input UPI PIN",
      input: "password",
      inputLabel: "Your UPI PIN",
      inputPlaceholder: "Enter your PIN",
    });

    if (pass.length > 4) {
      swal.fire("You have exceeded 4 characters!");
      return false;
    } else {
      var pins = {
        pin: pass,
      };

      $http
        .get(ip + "check_balance", { params: pins, withCredentials: true })
        .then(function (response) {
          console.log(response);
          $scope.money = response.data;
          console.log($scope.money);
          Swal.fire(`Your Total Account Balance is : &#x20b9; ${$scope.money}`);
        })
        .catch(function (error) {
          console.log(error);
          $scope.err = error.data;
          // console.log($scope.err);
          Swal.fire(
            `Error : ${$scope.err.message}`
            // icon: "error",
            // title: "Something went wrong",
            // text: error.data.message,
            // showConfirmButton: false,
            // timer: 2000,
          );
        });
    }
  };

  $scope.pin = async function () {
    const { value: password } = await Swal.fire({
      title: "Input UPI Pin",
      input: "password",
      inputLabel: "Your UPI PIN",
      inputPlaceholder: "Enter your UPI PIN",
    });

    if (password.length > 4) {
      swal.fire("You have exceeded 4 characters!");
      return false;
    } else {
      var num = {
        pin: password,
      };

      $http
        .get(ip + "edit_pin", { params: num, withCredentials: true })
        .then(function (response) {
          console.log(response);
          $state.go("CreatePin");
        })
        .catch(function (error) {
          Swal.fire(`Error : ${error.data.message}`);
        });
    }
  };
});

app.controller("CashbackController", function ($scope, $http, $window, $state) {
  $scope.coupons = {};

  $http
    .get(ip + "show_coupons", {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
      $scope.coupons = response.data;
      console.log($scope.coupons);

      $scope.view = function (offer) {
        var ids = {
          id: offer.id,
        };
        $http
          .get(ip + "view_coupon", { params: ids, withCredentials: true })
          .then(function (response) {
            console.log(response);
            $scope.details = response.data;
            console.log($scope.details);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        // text : error.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    });
});

app.controller("ProfileController", function ($scope, $http, $window, $state) {
  $http
    .get(ip + "profile", {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response);
      $scope.details = response.data;
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        // text : error.data.message,
        showConfirmButton: false,
        timer: 2000,
      });
    });
});
