(function () {
    'use strict';

    angular.module('cmInvalidRestrictions')
        .controller('InvalidRestrictions', InvalidRestrictions);

    function InvalidRestrictions($scope, downloadFileService) {

        $scope.DulFileTitle = "structured_DUL";
        $scope.DarFileTitle = "structured_DAR";
        $scope.download = function download(fileName, text) {
            var break_line =  '\r\n \r\n';
            text = break_line+ JSON.stringify(text);
            downloadFileService.downloadFile(fileName ,text);
        };

    }


})();
