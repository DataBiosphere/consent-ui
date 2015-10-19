(function () {

    'use strict';

    angular.module('cmResearcherConsole')
        .controller('ResearcherConsole', ResearcherConsole);

    /* ngInject */
    function ResearcherConsole($modal, cmConsentService, $scope, $http) {

        $scope.dars = []; //declare an empty array
        $http.get("json/cm_researcher_console.json").success(function(response){
            $scope.dars = response;  //ajax request to fetch data into $scope.data
        });

        var vm = this;

        vm.openRUS = openRUS;

        init();

        function init() {
            cmConsentService.findConsentManage(vm);
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
