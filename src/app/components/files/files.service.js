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

        function getDulFileByElectionId(consentId, fileName, electionId) {
            var consentUrl = apiUrl + 'consent/' + consentId + '/dul?electionId=' + electionId;
            getFile(consentUrl, fileName);
        }

        function getOntologyFile(fileName, fileUrl) {
            var encodeURI = encodeURIComponent(fileUrl);
            var ontologyUrl = apiUrl + 'ontology/file?fileUrl=' + encodeURI + '&fileName=' + fileName;
            getFile(ontologyUrl, fileName);
        }

        function getApprovedUsersFile(fileName, dataSetId) {
            var datasetUrl = apiUrl + 'dataset/' + dataSetId + '/approved/users';
            getFile(datasetUrl, fileName);
        }
        function getFile(url, fileName) {
            $http({
                url: url,
                method: "GET",
                responseType: 'arraybuffer'
            }).
                then(function (response) {
                    var isIE = /*@cc_on!@*/false || !!document.documentMode;
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
            getDulFileByElectionId: function(consentId, fileName, electionId){
                return getDulFileByElectionId(consentId, fileName, electionId);
            },
            getDULFile: function (consentId, fileName) {
                return getDULFile(consentId, fileName);
            },
            getOntologyFile: function (fileName, fileUrl) {
                return getOntologyFile(fileName, fileUrl);
            },
            getApprovedUsersFile: function (fileName, fileUrl) {
                return getApprovedUsersFile(fileName, fileUrl);
            }
        };
    }
})();
