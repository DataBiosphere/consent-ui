(function () {
    'use strict';

    angular.module('cmModalUsersAdd')
        .directive('addRole', addRoleRadioDirective);
    angular.module('cmModalUsersAdd')
        .directive('setMailPreference', setMailPreference);
    angular.module('cmModalUsersEdit')
        .directive('addRoleEdit', addRoleRadioDirective);
    angular.module('cmModalUsersEdit')
        .directive('setMailPreference', setMailPreference);


    /* ngInject */
    function addRoleRadioDirective() {

        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element, USER_ROLES) {
                element.bind("change", function () {
                    USER_ROLES = scope.USER_ROLES
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

                    var wasNotChairperson = scope.from == 'edit' ?  !scope.user.was(USER_ROLES.chairperson) : true;
                    if (element.context.id === USER_ROLES.chairperson) {
                        if (element.context.checked && wasNotChairperson) {
                            scope.$emit("changeChairpersonRoleAlert", {alert: true});
                        } else {
                            scope.$emit("changeChairpersonRoleAlert", {alert: false});
                        }
                    }
                });
            }
        };
    }

    /* ngInject */
    function setMailPreference() {

        return {
            restrict: "EA",
            scope: false,
            link: function (scope, element) {
                element.bind("change", function () {
                    var i = scope.user.roles.length;
                    while (i--) {
                        if (scope.user.roles[i] && scope.user.roles[i].name === "ADMIN") {
                            scope.$apply(function () {
                                scope.user.roles[i].emailPreference = !element.context.checked
                            });
                        }
                    }
                });
            }
        };
    }


})();
