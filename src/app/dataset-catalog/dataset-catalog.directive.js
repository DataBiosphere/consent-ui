/*jshint loopfunc: true */

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
                    if (element.context.checked) {
                        scope.$apply(function () {
                            scope.objectIdList.push(element.context.id);
                        });
                    } else {
                        var i = scope.objectIdList.length;
                        while (i--) {
                            if (scope.objectIdList[i] === element.context.id) {
                                scope.$apply(spliceFromList(scope.objectIdList,i));
                            }
                        }
                    }
                });
            }
        };
    }

    function spliceFromList(list,i) {
                 list.splice(i, 1);
    }

    function selectAllDatasetsDirective() {
        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element) {
                element.bind("change", function () {
                    // Defined in dirPagination.js Line:104.
                    var dataList = scope.filteredCollection;
                    var i = 1, index = 0, currentPage = 1;
                    if (element.context.checked) {
                        scope.objectIdList = [];
                        scope.$apply(function () {
                            var checkboxModel;
                            for (i; i <= dataList.length; i++) {
                                if (index === 10) {
                                    index = 0;
                                    currentPage++;
                                     checkboxModel = 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = true;
                                } else {
                                     checkboxModel = 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = true;
                                }
                            }
                            dataList.forEach( function(obj) {
                                console.log(obj);
                                    scope.objectIdList.push(obj.dataSetId.toString());
                            });
                        });
                    } else {
                        scope.$apply(function () {
                            var checkboxModel;
                            for (i; i <= dataList.length; i++) {
                                if (index === 10) {
                                    index = 0;
                                    currentPage++;
                                    checkboxModel = 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = false;
                                } else {
                                    checkboxModel = 'field_' + currentPage + index;
                                    index++;
                                    scope.checkMod[checkboxModel] = false;
                                    scope.objectIdList = [];
                                }
                            }
                        });
                    }
                });
            }
        };
    }


})();
