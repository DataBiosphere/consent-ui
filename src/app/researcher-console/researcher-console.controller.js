(function () {

    'use strict';

    angular.module('cmResearcherConsole')
        .controller('ResearcherConsole', ResearcherConsole);

    /* ngInject */
    function ResearcherConsole($modal, $scope, cmRPService, $rootScope, $state) {

        var vm = this;
        vm.userId = $rootScope.currentUser.dacUserId;
        vm.openRUS = openRUS;
        vm.review = review;
        vm.resume = resume;
        vm.cancelPartialDar = cancelAndDeletePartialDar;
        vm.cancelDar = cancelDar;
        vm.partialDars = [];
        init();

        function init() {
            cmRPService.getDataAccessManage(vm);
            cmRPService.getPartialDarRequestList(vm);
        }

        function review(id) {
            cmRPService.getDarFields(id, null).then(function (data) {
                $rootScope.formData = data;
                $rootScope.formData.datasetId = [];
                $rootScope.formData.datasetDetail.forEach(function(detail){
                    var obj = {};
                    obj.id = detail.datasetId;
                    if (detail.objectId !== undefined && detail.objectId !== null) {
                        obj.concatenation = detail.objectId + "  " + detail.name;
                    } else {
                        obj.concatenation = detail.name;
                    }
                    $rootScope.formData.datasetId.push(obj);
                });
                $state.go('rp_application.step1');

            });
        }

        function resume(id) {
            cmRPService.getPartialDarRequest(id).then(function (data) {
                $rootScope.formData = data;
                $state.go('rp_application.step1');
            });
        }

        /* Cancels and deletes a sent DAR Request, and deletes the associated election if there's any. */
        function cancelDar(id) {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/cancel-dar-modals/confirmation-cancel-dar.html',
                controller: 'PDarCancelModalConfirmation',
                controllerAs: 'PDarCancelModalConfirmation',
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function () {
                init();
            }, function(){
                init();
            });
        }


        /* Cancels and deletes the PARTIAL DAR */
        function cancelAndDeletePartialDar(id) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/partial-dar-modals/confirmation-partial-dar.html',
                controller: 'PDarModalConfirmation',
                controllerAs: 'PDarModalConfirmation',
                resolve: {
                    darId: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function () {
                init();
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
