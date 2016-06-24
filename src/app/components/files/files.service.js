(function () {
    'use strict';

    angular.module('cmFiles')
        .service('cmFilesService', cmFilesService);

    /* ngInject */
    function cmFilesService($http, apiUrl) {

        function getDULFile(consentId, fileName) {
            var consentUrl = apiUrl + 'consent/' + consentId + '/dul';
            getFile(consentUrl, fileName);
        }

        function getOntologyFile(fileName, fileUrl) {
            var encodeURI = encodeURIComponent(fileUrl);
            var ontologyUrl = apiUrl + 'ontology/file?fileUrl=' + encodeURI + '&fileName=' + fileName;
            getFile(ontologyUrl, fileName);
        }

        function getFile(url, fileName) {

            $http({
                url: url,
                method: "GET",
                responseType: 'arraybuffer'
            }).
                then(function (response) {

                    var isFirefox = typeof InstallTrigger !== 'undefined';
                    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
                    var isEdge = !isIE && !!window.StyleMedia;
                    var isChrome = !!window.chrome && !!window.chrome.webstore;
                    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
                    var isBlink = (isChrome || isOpera) && !!window.CSS;

                    var contentType = response.headers()["content-type"];
                    var blob = new Blob([response.data], { type: contentType });
                    if (blob.size !== 0) {
                        var downloadElement = angular.element('<a/>');
                        downloadElement.css({ display: 'none' });
                        angular.element(document.body).append(downloadElement);
                        
                        if (isIE) {
                            downloadElement.attr({
                                href: window.navigator.msSaveOrOpenBlob(blob, fileName)
                            });
                        } else {
                            downloadElement.attr({
                                href: (window.URL || window.webkitURL).createObjectURL(blob),
                                target: '_blank',
                                download: fileName
                            })[0].click();
                        }
                    }
                });
        }

        return {
            getDULFile: function (consentId, fileName) {
                return getDULFile(consentId, fileName);
            },
            getOntologyFile: function (fileName, fileUrl) {
                return getOntologyFile(fileName, fileUrl);
            }
        };
    }
})();
