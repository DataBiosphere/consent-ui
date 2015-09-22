(function () {
    'use strict';

    angular.module('cmDatasetCatalog')
        .directive('addObjectId', addObjectIdDirective);

    angular.module('cmDatasetCatalog')
        .directive('selectAll', selectAllDatasetsDirective);

    /* ngInject */
    function addObjectIdDirective() {
        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element) {
                element.bind("change", function () {
                    if(element.context.checked){
                        scope.$apply(function () {
                            scope.objectIdList.push(element.context.id);
                        });
                    } else{
                        var i = scope.objectIdList.length;
                        while(i--){
                            if( scope.objectIdList[i] === element.context.id){
                                scope.$apply(function () {
                                    scope.objectIdList.splice(i,1);
                                });
                            }
                        }
                    }
                });
            }
        }
    }

    function selectAllDatasetsDirective() {
        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element, attributes,USER_ROLES) {
                element.bind("change", function () {
                    // Defined in dirPagination.js Line:104.
                    var dataList = scope.filteredCollection;
                    var i= 1, index = 0, currentPage = 1;
                    if(element.context.checked){
                        scope.objectIdList=[];
                        scope.$apply(function () {
                            for(i ; i <= dataList.length; i++){
                                if(index == 10){
                                    index = 0;currentPage++;
                                    var checkboxModel= 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = true;
                                }else{
                                    var checkboxModel= 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = true;
                                }
                            }
                            var totalRecord = dataList.length;
                            while(totalRecord--){
                                angular.forEach(dataList[totalRecord].properties, function(obj) {
                                    if(obj.propertyName =='Dataset ID'){
                                        scope.objectIdList.push(obj.propertyValue);
                                    }
                                });
                            }
                        });
                    }else{
                        scope.$apply(function () {
                            for(i ; i <= dataList.length; i++){
                                if(index == 10){
                                    index = 0;
                                    currentPage++;
                                    var checkboxModel= 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = false;
                                }else{
                                    var checkboxModel= 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = false;
                                    scope.objectIdList=[];
                                }
                            }
                        });
                    }
                });
            }
        }
    }


})();
