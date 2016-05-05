(function () {
    'use strict';

    angular.module('cmDataset')
        .service('cmDatasetService', cmDatasetService);

    /* ngInject */
    function cmDatasetService(PostDsFileResource, DataSetResource, DictionaryResource, DownloadDatasetResource, DeleteDataSetResource, DisableDataSetResource, ReviewDataSetResource, GetDatasetResource) {

        /**
         * Post the file that contains the datasets.
         * @param file, using as a base the sample file provided by the application.
         */
        function postDataFile(file, overwrite, userId) {
            return PostDsFileResource.post({userId: userId, overwrite: overwrite}, file);
        }

        function getDataSets(dacUserId) {
            return DataSetResource.List({dacUserId: dacUserId}).$promise;
        }

        function getDataSetsByDatasetId(datasetId) {
                    return GetDatasetResource.get({datasetId: datasetId}).$promise;
        }

        function getDictionary() {
            return DictionaryResource.List().$promise;
        }

        function download(objectIdList) {
            return DownloadDatasetResource.download(objectIdList).$promise;
        }

        function deleteDataset(datasetObjectId, dacUserId) {
            return DeleteDataSetResource.Delete({datasetObjectId: datasetObjectId, dacUserId: dacUserId}).$promise;
        }

        function disableDataset(datasetObjectId, active) {
            return DisableDataSetResource.Delete({datasetObjectId: datasetObjectId, active: active}).$promise;
        }

        function  reviewDataSet(dataSetId, needsApproval){
            return ReviewDataSetResource.Update({dataSetId: dataSetId, needsApproval: needsApproval}).$promise;
        }

        return {
            postDatasetFile: function (file, overwrite, userId) {
                return postDataFile(file, overwrite, userId);
            },
            findDictionary: function () {
                return getDictionary();
            },
            findDataSets: function (dacUserId) {
                return getDataSets(dacUserId);
            },
            getDataSetsByDatasetId: function (dataSetId) {
                            return getDataSetsByDatasetId(dataSetId);
            },
            downloadDataSets: function (objectIdList) {
                return download(objectIdList);
            },
            deleteDataset: function (datasetId, dacUserId) {
                return deleteDataset(datasetId, dacUserId);
            },
            disableDataset: function (datasetId, active) {
                return disableDataset(datasetId, active);
            },
            reviewDataSet: function (dataSetId, review) {
                return reviewDataSet(dataSetId, review);
            }

        };
    }
})();
