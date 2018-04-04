function MainController($scope) {
    $scope.format = 'HH:mm:ss';
    $scope.colour = '#00FF00';
}

angular.module('time', [])
    .directive('hexClock', function ($timeout, dateFilter) {
        return function (scope, element, attrs) {
            var timeoutId; // keep track of time updates

            // used to update the UI
            scope.updateTime = function() {
                var formattedTime = dateFilter(new Date(), scope.format),
                    hexTime = formattedTime.replace(/:/g, '');

                scope.colour = "#" + hexTime;
                element.text('#' + hexTime);
            }

            scope.nextSecond = function() {
                timeoutId = $timeout(function () {
                    scope.updateTime();
                    scope.nextSecond();
                }, 1000); // tick tock
            }

            scope.$watch(attrs.hexClock, function (value) {
                scope.format = value;
                scope.updateTime();
            });

            element.bind('$destroy', function () {
                $timeout.cancel(timeoutId);
            });

            scope.nextSecond();
        }
    });