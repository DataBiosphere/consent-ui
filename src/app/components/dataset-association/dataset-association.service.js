(function () {
    'use strict';

    angular.module('cmDatasetAssociation')
        .service('cmDatasetAssociationService', cmDatasetAssociationService);

    /* ngInject */
    function cmDatasetAssociationService(DatasetAssociationResource) {

        function createDatasetAssociations(objectId, usersIdList) {
                    return DatasetAssociationResource.post({objectId: objectId},usersIdList).$promise;
                }

        function getAssociatedAndToAssociateUsers(objectId) {
            return DatasetAssociationResource.get({objectId: objectId}).$promise;
        }

        function updateDatasetAssociations(objectId, usersIdList) {
            return DatasetAssociationResource.put({objectId: objectId},usersIdList).$promise;
        }

        return {
            createDatasetAssociations: function (objectId, usersIdList) {
                return createDatasetAssociations(objectId, usersIdList);
            },

            getAssociatedAndToAssociateUsers: function (objectId) {
                return getAssociatedAndToAssociateUsers(objectId);
            },

            updateDatasetAssociations: function (objectId, usersIdList) {
                return updateDatasetAssociations(objectId, usersIdList);
            },

        };
    }

})();
