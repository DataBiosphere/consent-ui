(function () {
    'use strict';

    angular.module('cmOntology')
        .service('cmOntologyService', cmOntologyService);

    /* ngInject */
    function cmOntologyService(OntologyResource, OntologyTypesResource) {

        function postOntologyFile(fileData) {
                return OntologyResource.post(fileData).$promise;
            }

        function retrieveIndexedFiles() {
                return OntologyResource.List().$promise;
        }

        function deleteOntologyFile(fileUrl){
                return OntologyResource.Delete(fileUrl).$promise;
        }

        function getOntologyTypes(){
                return OntologyTypesResource.get().$promise;
        }

        return {
                postOntologyFile: function (fileData) {
                     return postOntologyFile(fileData);
                  },
                retrieveIndexedFiles: function () {
                     return retrieveIndexedFiles();
                  },
                deleteOntologyFile: function (fileUrl) {
                     return deleteOntologyFile(fileUrl);
                  },

                  getOntologyTypes: function () {
                     return getOntologyTypes();
                  }
               };
     }
})();
