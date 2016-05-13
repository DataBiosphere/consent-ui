(function () {
    'use strict';

    angular.module('cmManageOntologies')
        .controller('ManageOntologies', ManageOntologies);

    /* ngInject */
    function ManageOntologies($modal, $state, $scope, cmOntologyService, cmFilesService) {

        $scope.addOntology = addOntology;
        $scope.openDelete = openDelete ;


        init();
        function init() {
            cmOntologyService.retrieveIndexedFiles().then(
               function (indexedFiles) {
                  $scope.indexedFiles = indexedFiles;
               });
         }


        function openDelete(fileUrl) {
                    $scope.actionType = 'delete';
                    var modalInstance = $modal.open({
                        animation: false,
                        templateUrl: 'app/modals/delete-ontology-modal.html',
                        controller: 'Modal',
                        controllerAs: 'Modal',
                        scope: $scope
                    });

                    modalInstance.result.then(function () {
                        cmOntologyService.deleteOntologyFile(fileUrl).then(
                                             function () {
                                                   init();
                                                });
                        });
                    }


        function addOntology() {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'app/modals/add-ontologies/add-ontologies.html',
                controller: 'AddOntologyModal',
                controllerAs: 'AddOntologyModal',
                resolve: {
                               ontologyTypes:  function (cmOntologyService) {
                                      return cmOntologyService.getOntologyTypes();
                         }
            }
          });

            modalInstance.result.then(function () {
                $state.go('manage_ontologies');
                init();
            }, function () {
            });
        }

        $scope.downloadOntology = function(fileName, fileUrl){
            cmFilesService.getOntologyFile(fileName, fileUrl);
        };
    }
})();
