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
            link: function (scope, element, attributes,USER_ROLES) {
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


    /* ngInject */
    //function selectAllDatasetsDirective() {
    //    return {
    //        restrict: "EA",
    //        scope: false,
    //        link: function (scope, element, attributes,USER_ROLES) {
    //            element.bind("change", function () {
    //                var dataList = scope.$parent.DatasetCatalog.dataSetList.catalog;
    //                var pageNumber = scope.DatasetCatalog.activePage.catalog;
    //                var pageIndex = pageNumber * 10;
    //                var i = dataList.length;
    //                if(element.context.checked){
    //                    scope.objectIdList=[];
    //                    scope.$apply(function () {
    //                        while(i--){
    //                            var checkboxModel= 'field_'+(pageIndex+i);
    //                            scope.checkMod[checkboxModel] = true;
    //                            angular.forEach(dataList[i].properties, function(obj) {
    //                                if(obj.propertyName =='Dataset ID'){
    //                                    scope.objectIdList.push(obj.propertyValue);
    //                                }
    //                            });
    //                        }
    //                    });
    //                }
    //



    function selectAllDatasetsDirective() {
        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element, attributes,USER_ROLES) {
                element.bind("change", function () {
                    var dataList = scope.$parent.DatasetCatalog.dataSetList.catalog;
                    var i= dataList.length;
                    if(element.context.checked){
                        scope.objectIdList=[];
                        scope.$apply(function () {
                            while(i--){
                                var checkboxModel= 'field_'+i;
                                scope.checkMod[checkboxModel] = true;
                                angular.forEach(dataList[i].properties, function(obj) {
                                    if(obj.propertyName =='Dataset ID'){
                                        scope.objectIdList.push(obj.propertyValue);
                                    }
                                });
                            }
                        });
                    }else{
                        scope.$apply(function () {
                            while(i--){
                                var checkboxModel= 'field_'+i;
                                scope.checkMod[checkboxModel] = false;
                            }
                            scope.objectIdList=[];
                        });
                    }
                });
            }
        }
    }
})();
