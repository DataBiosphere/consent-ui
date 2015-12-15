(function () {

    'use strict';

    angular.module('cmResearcherConsole')
        .controller('ResearcherConsole', ResearcherConsole);

    /* ngInject */
    function ResearcherConsole($modal, $scope, cmRPService, $rootScope, $state) {

        var vm = this;
        vm.userId = $rootScope.currentUser.dacUserId;
        vm.openRUS = openRUS;
        vm.edit = edit;

        init();

        function init() {
            cmRPService.getDataAccessManage(vm);
        }

        function edit(id) {
            cmRPService.getDarFields(id, null).then(function (data) {
                $rootScope.formData = data;
                cmRPService.getAutoCompleteDS(data.datasetId).then(function (o){
                $rootScope.formData.datasetId = []
                var obj = {}
                obj.id = o[0].id;
                obj.concatenation = o[0].concatenation;
                $rootScope.formData.datasetId.push(obj)
                $state.go('rp_application.step1');
                })

            });
        }

        function openRUS(rus) {
            $scope.rus = rus;
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/extra-info-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal',
                scope: $scope
            });

            modalInstance.result.then(function () {
            }, function () {
            });
        }


    }

})();
