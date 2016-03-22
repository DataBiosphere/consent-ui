(function () {
    'use strict';

    angular.module('cmInvalidRestrictions')
        .controller('InvalidRestrictions', InvalidRestrictions);

    function InvalidRestrictions($scope, downloadFileService, cmConsentService, cmRPService) {

        var vm = this;
        vm.consentList = {};
        vm.darList = {};
        init();

        function init() {
            cmConsentService.findInvalidConsentRestriction(vm);
            cmRPService.findInvalidDataAccessUseRestriction(vm);

        }
        $scope.download = function download(fileName, text) {
            var break_line =  '\r\n \r\n';
            text = break_line+ text;
            downloadFileService.downloadFile(fileName+'-restriction.txt' ,text);
        };

    }


})();
