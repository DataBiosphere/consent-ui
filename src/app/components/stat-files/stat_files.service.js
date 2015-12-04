(function () {
    'use strict';

    angular.module('cmStatFiles')
        .service('cmStatFilesService', cmStatFilesService);

    /* ngInject */
    function cmStatFilesService($http , apiUrl) {

        function getFile(fileType) {
                      $http({
                           url: apiUrl + 'consent/cases/summary/file?fileType=' + fileType,
                           method: "GET"
                       }).
                       success(function(data) {
                               var blob = new Blob([data], {type: 'text/plain'});
                               if(blob.size !== 0){
                                            var downloadElement = angular.element('<a/>');
                                            downloadElement.css({display: 'none'});
                                            angular.element(document.body).append(downloadElement);
                                            if (fileType ==='TranslateDUL'){
                                            downloadElement.attr({
                                                href: (window.URL || window.webkitURL).createObjectURL(blob),
                                                target: '_blank',
                                                download: 'summary.txt'
                                            })[0].click();
                                           }
                                            if (fileType ==='DataAccess'){
                                            downloadElement.attr({
                                                href: (window.URL || window.webkitURL).createObjectURL(blob),
                                                target: '_blank',
                                                download: 'DAR_summary.txt'
                                            })[0].click();
                                           }
                              }
                       });
               }
             return{
               getFile: function(fileType) {
               return getFile(fileType);
            }
        };
    }
})();
