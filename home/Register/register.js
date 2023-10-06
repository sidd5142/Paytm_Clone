app.controller('ProductAddController',['$scope', '$state', '$http', function($scope, $state, $http){
    $scope.register = function(){

    }
}])

app.directive('fileUpload', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
         element.bind('change', function(event) {
          var file = event.target.files[0];
          scope.$apply(function() {
            ngModel.$setViewValue(file);
          });
        });
      }
    };
 })