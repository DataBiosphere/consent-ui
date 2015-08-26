(function () {
    'use strict';

    angular.module('cmModalUsersEdit')
        .directive('addRoleEdit', addRoleRadioDirective);

    /* ngInject */
    function addRoleRadioDirective() {

        return {
           restrict: "EA",
           scope: false,
                    link: function (scope, element, attributes,USER_ROLES) {
                        USER_ROLES=scope.USER_ROLES;
                        element.bind("change", function () {
                            if(element.context.checked){
                                var rol =  new Object();
                                rol.name=element.context.id;
                                scope.$apply(function () {
                                scope.user.roles.push(rol);
                                  });

                        }else{
                             var i = scope.user.roles.length;
                             while(i--){
                                  if( scope.user.roles[i]
                                      && scope.user.roles[i].name===element.context.id){
                                       scope.$apply(function () {
                                                  scope.user.roles.splice(i,1);
                                      });
                                  }
                               }
                             }
                                if(element.context.id=== USER_ROLES.chairperson){
                                             if(element.context.checked && !scope.user.was(USER_ROLES.chairperson)){
                                                 scope.$emit("changeChairpersonRoleAlert", { alert : true });
                                             }else{
                                                 scope.$emit("changeChairpersonRoleAlert", { alert : false });
                                                  }
                                             }
                          });
                     }
                  }
              }



})();
