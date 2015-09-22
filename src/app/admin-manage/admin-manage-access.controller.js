(function () {
    'use strict';

    angular.module('cmAdminManage')
        .controller('AdminManageAccess', AdminManageAccess);

    /* ngInject */
    function AdminManageAccess($modal, cmConsentService, $scope, $http) {


        $scope.dars = []; //declare an empty array
        $http.get("json/cm_admin_manage.json").success(function(response){
            $scope.dars = response;  //ajax request to fetch data into $scope.data
        });

        var vm = this;

        vm.openCreate = openCreate;
        vm.openCancel = openCancel;
        vm.openRUS = openRUS;


        init();

        function init() {
            cmConsentService.findConsentManage(vm);
        }

        function openCreate () {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/create-election-modal/create-access-modal.html',
                controller: 'ModalAccessCreate',
                controllerAs: 'ModalAccessCreate'
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
            }, function () {
                //what to do if the modal was canceled
            });
        }

        function openCancel () {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/cancel-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal'
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
            }, function () {
                //what to do if the modal was canceled
            });
        }


        function openRUS() {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/extra-info-modal.html',
                controller: 'Modal',
                controllerAs: 'Modal'
            });

            modalInstance.result.then(function (selectedItem) {//selectedItem - params to apply when the fc was successful
                //what to do if it was accepted
            }, function () {
                //what to do if the modal was canceled
            });
        }



    }
})();
