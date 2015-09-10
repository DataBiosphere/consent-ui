(function () {
    'use strict';

    angular.module('cmDataset', [])


        .factory('PostDsFileResource', function($resource, apiUrl){
        return $resource(apiUrl+"dataset",{}, {
            post: {method: 'POST', isArray:true, params: {overwrite: 'overwrite'}, headers: { 'Content-Type': undefined },
                transformRequest: function (data, headers) {
                    var formData = new FormData();
                    formData.append("data", new Blob([data], { type: 'text/plain' }));
                    return formData;
                }
            }
         });
        })

        .factory('DataSetResource', function($resource, apiUrl){
                   return $resource(apiUrl+"dataset", {}, {
                       List: {method:'GET',isArray:true}
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
})();

