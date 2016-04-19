(function () {
    'use strict';

    angular.module('cmDulFiles')
        .service('cmDulFilesService', cmDulFilesService);

    /* ngInject */
    function cmDulFilesService($http , apiUrl) {

        function getFile(consentId, fileName) {
            $http({
                url: apiUrl + 'consent/'+consentId+'/dul',
                method: "GET",
                responseType:'arraybuffer'
            }).
                then(function(response) {
                    var contentType = response.headers()["content-type"];
                    var blob = new Blob([response.data], {type: contentType});
                    if(blob.size !== 0){
                        var downloadElement = angular.element('<a/>');
                        downloadElement.css({display: 'none'});
                        angular.element(document.body).append(downloadElement);
                        downloadElement.attr({
                            href: (window.URL || window.webkitURL).createObjectURL(blob),
                            target: '_blank',
                            download: fileName
                        })[0].click();
                    }
                });
        }
        return{
            getFile: function(consentId, fileName) {
                return getFile(consentId, fileName);
            }
        };
    }
})();
