(function () {
    'use strict';

    angular.module('cmAddOntologyModal')
        .controller('AddOntologyModal', AddOntologyModal);

    /* ngInject */
    function AddOntologyModal($modalInstance, $scope,ontologyTypes, cmOntologyService) {

        $scope.disableButton = false;



        for(var i= 0; i<ontologyTypes.length; i++){
           var s = ontologyTypes[i];
           s = s.toLowerCase();
           s = s.charAt(0).toUpperCase() + s.slice(1);
           ontologyTypes[i] = s
             if(i === ontologyTypes.length-1) {
                 $scope.ontologyTypes = ontologyTypes;
          }
        }


        $scope.$on("fileSelected", function (event, arg) {
            $scope.$apply(function () {
                $scope.file = arg.file;
            });
        });


        $scope.add = function(){
                 $scope.disableButton = true;
                  var fileMetadata = { "prefix" : $scope.prefix,
                                       "type" : $scope.ontologyType
                 };
                 var fileData = {"file": $scope.file,
                          "fileMetadata" : fileMetadata   }
                 var response = cmOntologyService.postOntologyFile(fileData);
                 response.then(function () {
                                $modalInstance.close();
                            }).catch(function (errorResponse) {
                                errorResponse.status == 304 ?
                                fileUploadErrorAlert("Please check the prefix, it doesn't match any ontology Id in file")  :
                                fileUploadErrorAlert(errorResponse.data.message)
                                $scope.disableButton = false;
                            });
                }


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /*****ALERTS*****/

        $scope.alerts = [];
        var fileUploadErrorAlert = function (msg,index) {
            $scope.alerts.splice(index, 1);
            $scope.alerts.push({
                title: "Ontologies weren't Indexed.",
                msg: msg,
                alertType: 1
            });
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
    }

})();

