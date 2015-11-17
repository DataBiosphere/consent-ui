(function () {
    'use strict';

    angular.module('cmModalUsersAdd')
        .directive('addRole', addRoleRadioDirective);

    /* ngInject */
    function addRoleRadioDirective() {

        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element) {
                element.bind("change", function () {

                    if (element.context.checked) {
                        var rol = {};
                        rol.name = element.context.id;
                        scope.$apply(function () {
                            scope.user.roles.push(rol);
                        });

                    } else {
                        var i = scope.user.roles.length;
                        while (i--) {
                            if (scope.user.roles[i] && scope.user.roles[i].name === element.context.id) {
                                scope.$apply(function () {
                                    scope.user.roles.splice(i, 1);
                                });
                            }
                        }
                    }
                    if (element.context.id === "CHAIRPERSON") {
                        if (element.context.checked) {
                            scope.$emit("changeChairpersonRoleAlert", {alert: true});
                        } else {
                            scope.$emit("changeChairpersonRoleAlert", {alert: false});
                        }
                    }
                });
            }
        };
    }


})();
