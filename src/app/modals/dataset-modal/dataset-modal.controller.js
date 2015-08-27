(function () {
    'use strict';

    angular.module('cmDataSetModal')
        .controller('DataSetModal', DataSetModal);

    /* ngInject */
    function DataSetModal($modalInstance, $scope) {

        var vm = this;

        vm.ok = function (value) {

            };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

            //$scope.data = '';
            //$scope.disableButton = false;
            //
            //if (consent !== undefined) {
            //    $scope.consent = consent;
            //    $scope.file = new Object();
            //    $scope.file.name = consent.dulName
            //}
            //
            //$scope.$on("fileSelected", function (event, arg) {
            //    $scope.$apply(function () {
            //        $scope.file = arg.file;
            //    });
            //});

            /*****ALERTS*****/

            $scope.alerts = [];

            $scope.fileUploadErrorAlert = function (index) {
                $scope.alerts.splice(index, 1);
                $scope.alerts.push({
                    title: 'Conflicts to resolve!',
                    msg: "Some errors occurred, Datasets weren't uploaded.",
                    alertType: 1
                });
            };

            $scope.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

    }

})();

