

angular.module('patientmanager').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {


    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});