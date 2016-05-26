(function () {
    'use strict';

    angular.module('cmOntology', [])

        .factory('OntologyResource', function($resource, apiUrl){
        return $resource(apiUrl+"ontology",{}, {
            post: {method: 'POST',
            headers: { 'Content-Type': undefined},
                transformRequest: function (fileData) {
                  var fd = new FormData();
                  var uuid = guid();
                  var metadata = {};
                  metadata[uuid] = fileData.fileMetadata;
                  fd.append(uuid,fileData.file);
                  fd.append("metadata",JSON.stringify(metadata));
                  return fd;
                }
            },
            List:{method: 'GET', isArray: true},
            Delete: {method:'PUT', params: {}}
         });
     })

     .factory('OntologyTypesResource',function($resource,apiUrl){
          return $resource(apiUrl+"ontology/types",{}, {
             get: {method: 'GET', isArray: true}
          });
     });


function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

})();


