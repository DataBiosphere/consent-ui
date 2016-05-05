(function () {
    'use strict';

    angular.module('cmTranslatedDulModal')
        .controller('TranslatedDulModal', TranslatedDulModal);

    /* ngInject */
    function TranslatedDulModal($modalInstance, $sce, $scope) {

        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };


        if (angular.isDefined($scope.dataset)) {
                            $scope.dataset = $sce.trustAsHtml($scope.dataset);
        }

    }

})();
