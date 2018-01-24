(function () {
    'use strict';

    angular.module('cmDULModal')
        .controller('DULModal', Modal);


    /* ngInject */
    function Modal($modalInstance, cmConsentService, $scope, consent) {

        var vm = this;
        $scope.data = '';
        $scope.disableButton = false;

        if(typeof consent.useRestriction === 'object'){
            $scope.useRestriction = JSON.stringify(consent.useRestriction);
        }

        if(typeof consent.dataUse === 'object'){
            $scope.dataUse = JSON.stringify(consent.dataUse);
        }

        if (consent !== undefined) {
            $scope.consent = consent;
            $scope.file = new Object({});
            $scope.file.name = consent.dulName;
        }

        $scope.$on("fileSelected", function (event, arg) {
            $scope.$apply(function () {
                $scope.file = arg.file;
            });
        });

        vm.ok = function (consent) {
            $scope.disableButton = true;
            try{
                JSON.parse($scope.useRestriction);
            }catch(err){
                $scope.duplicateEntryAlert(0, "Unable to process Structured Limitations JSON");
                $scope.disableButton = false;
                return;
            }
            try{
                JSON.parse($scope.dataUse);
            }catch(err){
                $scope.duplicateEntryAlert(0, "Unable to process Data Use JSON");
                $scope.disableButton = false;
                return;
            }
            consent.useRestriction = $scope.useRestriction;
            consent.dataUse = $scope.dataUse;
            cmConsentService.postConsent(consent).$promise.then(
                function (value) {
                    cmConsentService.postDul($scope.file, value.consentId, $scope.file.name).$promise.then(
                        function () {
                            $modalInstance.close();
                        },
                        function () {
                            fileUploadErrorAlert(0);
                            $scope.disableButton = false;
                        });
                },

                function (reason) {
                    if(reason.data.message === undefined){
                        $scope.duplicateEntryAlert(0, reason.data.cause.localizedMessage);
                    }else{
                        $scope.duplicateEntryAlert(0, reason.data.message);
                    }
                    $scope.disableButton = false;
                });
        };

        vm.edit = function (consent) {
            $scope.disableButton = true;
            try{
                JSON.parse($scope.useRestriction);
            }catch(err){
                $scope.duplicateEntryAlert(0, "Unable to process Structured Limitations JSON");
                $scope.disableButton = false;
                return;
            }
            try{
                JSON.parse($scope.dataUse);
            }catch(err){
                $scope.duplicateEntryAlert(0, "Unable to process Data Use JSON");
                $scope.disableButton = false;
                return;
            }
            consent.useRestriction = $scope.useRestriction;
            consent.dataUse = $scope.dataUse;
            cmConsentService.updateConsent(consent).$promise.then(
                function () {
                    if ($scope.file.type !== undefined) {
                        cmConsentService.postDul($scope.file, consent.consentId, $scope.file.name).$promise.then(
                            function () {
                                $modalInstance.close();
                            }, function () {
                                fileUploadErrorAlert(0);
                                $scope.disableButton = false;
                            }
                        );
                    } else {
                        $modalInstance.close();
                    }
                },
                function (reason) {
                    if(reason.data.message === undefined){
                        $scope.duplicateEntryAlert(0, reason.data.cause.localizedMessage);
                    }else{
                        $scope.duplicateEntryAlert(0, reason.data.message);
                    }
                    $scope.disableButton = false;
                }
            );
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


        /*****ALERTS*****/

        $scope.alerts = [];

        $scope.duplicateEntryAlert = function (index, message) {
            $scope.alerts.splice(index, 1);
            var tle = 'Conflicts to resolve!';
            if (message.indexOf("PRIMARY") > -1) {
                message = "There is a Data Use Limitation already registered with this Consent Id. ";
            } else if (message.indexOf("name") > -1) {
                message = "There is a Data Use Limitation already registered with this name.";
            } else if (message.indexOf("Unable to process JSON") > -1){
                message = "Structured Limitations has invalid format. Please write it as a JSON.";
            }
            else {
                tle = "Error, unable to create a new Data Use Limitation! ";
                message = message;
            }

            $scope.alerts.push({
                type: 'danger',
                title: tle,
                msg: message,
                alertType: 1
            });
        };

        function fileUploadErrorAlert(index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                type: 'danger',
                title: 'Server Error',
                msg: 'Problem with the file UpLoad.',
                alertType: 1
            });
        }

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

    }
})();
