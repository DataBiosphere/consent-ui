(function () {
    'use strict';

    angular
        .module('cmDownloadFile', [])
        .factory('downloadFileService', function () {
            return {
                downloadFile: function (fileName, text) {
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
                    var blob = new Blob([text], { type: 'text/plain' });
                    var downloadElement = angular.element('<a/>');
                    downloadElement.css({ display: 'none' });
                    angular.element(document.body).append(downloadElement);
                    if (isIE) {
                        downloadElement.attr({
                            href: window.navigator.msSaveOrOpenBlob(blob, fileName),
                        });
                    } else {
                        downloadElement.attr({
                            href: (window.URL || window.webkitURL).createObjectURL(blob),
                            target: '_blank',
                            download: fileName
                        })[0].click();
                    }
                }
            };
        });
})();
