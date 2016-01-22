(function () {
    'use strict';

    angular.module('cmDataset', [])

        .factory('PostDsFileResource', function($resource, apiUrl){
        return $resource(apiUrl+"dataset",{}, {
            post: {method: 'POST', isArray:true, params: {overwrite: 'overwrite'}, headers: { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("data", new Blob([data], { type: 'text/plain' }));
                    return formData;
                }
            }
         });
        })

        .factory('GetDatasetResource', function ($resource, apiUrl) {
                            return $resource(apiUrl + "dataset/:datasetId");
                })

        .factory('DataSetResource', function($resource, apiUrl){
                   return $resource(apiUrl+"dataset", {}, {
                       List: {method:'GET',params: {dacUserId: 'dacUserId'},isArray:true}
                   });
        })

        .factory('DeleteDataSetResource', function($resource, apiUrl){
                          return $resource(apiUrl+"dataset/:datasetObjectId", {}, {
                              Delete: {method:'DELETE',params: {datasetObjectId: '@datasetObjectId'}}
                          });
        })

        .factory('DisableDataSetResource', function($resource, apiUrl){
            return $resource(apiUrl+"dataset/disable/:datasetObjectId/:active", {}, {
                Delete: {method:'DELETE',params: {datasetObjectId: '@datasetObjectId', active: '@active'}}
            });
        })

        .factory('DictionaryResource', function($resource, apiUrl){
                   return $resource(apiUrl+"dataset/dictionary", {}, {
                                   List: {method:'GET',isArray:true}
                   });
        })

        .factory('DownloadDatasetResource', function($resource, apiUrl){
                           return $resource(apiUrl+"dataset/download", {}, {
                                           download: {method:'POST',
                                           headers: {'Accept': "application/json",
                                            'Content-Type': "application/json" } }
                           });
         })

        .factory('ReviewDataSetResource', function($resource, apiUrl){
            return $resource(apiUrl+"dataset?dataSetId=:dataSetId&needsApproval=:needsApproval", {}, {
                Update: {method:'PUT',params: {dataSetId: '@dataSetId', needsApproval: '@needsApproval'}}
            });
        });
})();


