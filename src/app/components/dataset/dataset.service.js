(function () {
    'use strict';

    angular.module('cmDataset')
        .service('cmDatasetService', cmDatasetService);

    /* ngInject */
    function cmDatasetService(PostDsFileResource,DataSetResource,DictionaryResource ,DownloadDatasetResource, DeleteDataSetResource) {

        /**
         * Post the file that contains the datasets.
         * @param file, using as a base the sample file provided by the application.
         */
        function postDataFile(file, overwrite){
          return PostDsFileResource.post({overwrite: overwrite}, file);

        }
        function getDataSets(dacUserId){
          return DataSetResource.List({dacUserId: dacUserId}).$promise;
        }

        function getDictionary(){
          return DictionaryResource.List().$promise;
        }

         function download(objectIdList){
           return DownloadDatasetResource.download(objectIdList).$promise;
        }

          function deleteDataset(datasetObjectId){
                   return DeleteDataSetResource.Delete({datasetObjectId: datasetObjectId}).$promise;
                }

        return {
            postDatasetFile: function(file, overwrite){
                return postDataFile(file, overwrite);
            },

              findDictionary: function() {
                return getDictionary();
            },
              findDataSets: function(dacUserId) {
               return getDataSets(dacUserId);
            },
             downloadDataSets: function(objectIdList) {
                return download(objectIdList);
            },
             deleteDataset: function(datasetId){
                            return deleteDataset(datasetId);
            }
        };
     }
})();
