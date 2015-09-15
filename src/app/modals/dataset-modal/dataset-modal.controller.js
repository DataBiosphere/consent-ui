(function () {
    'use strict';

    angular.module('cmDataSetModal')
        .controller('DataSetModal', DataSetModal);

    /* ngInject */
    function DataSetModal($modalInstance, $scope, apiUrl, cmDatasetService) {

        $scope.disableButton = false;
        $scope.overwrite = false;

        $scope.$on("fileSelected", function (event, arg) {
            $scope.$apply(function () {
                $scope.file = arg.file;
            });
        });

        var vm = this;

        vm.downloadUrl = apiUrl + "dataset/sample";

        vm.ok = function () {
            $scope.disableButton = true;
            var response = cmDatasetService.postDatasetFile($scope.file, $scope.overwrite).$promise;
            response.then(function() {
                $scope.disableButton = false;
                $modalInstance.close();
            }).catch(function(errorResponse) {
                fileUploadErrorAlert();
                $scope.url = generateFileAndUrl(errorResponse.data);
                $scope.disableButton = false;
            });
        };

        vm.releaseUrl = function () {
            setTimeout(function(){
                (window.URL || window.webkitURL).revokeObjectURL($scope.url);
            }, 500);
        };

        var generateFileAndUrl = function(errors){
            var content = '';
            for (var i = 0; i < errors.length; i++) {
                content += errors[i]+"\r\n";
            }
            var blob = new Blob([ content ], { type : 'text/plain' });
            return (window.URL || window.webkitURL).createObjectURL( blob );
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /*****ALERTS*****/

        $scope.alerts = [];
        var fileUploadErrorAlert = function (index) {
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

