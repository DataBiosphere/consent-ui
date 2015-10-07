(function () {
    'use strict';

    angular
        .module('cmAdminManage')
        .config(routeConfig);

    /* ngInject */
    function routeConfig($stateProvider, USER_ROLES) {
        $stateProvider
            .state('admin_manage', {
                name: 'admin_manage_dul',
                url: '/admin_manage_dul',
                templateUrl: 'app/admin-manage/admin-manage-dul.html',
                controller: 'AdminManage',
                controllerAs: 'AdminManage',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            })

            .state('admin_manage_access', {
                name: 'admin_manage_access',
                url: '/admin_manage_access',
                templateUrl: 'app/admin-manage/admin-manage-access.html',
                controller: 'AdminManageAccess',
                controllerAs: 'AdminManageAccess',
                data: {
                    authorizedRoles: [USER_ROLES.admin]
                }
            });
    }

})();
