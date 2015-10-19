(function () {
    'use strict';

    angular.module('cmHelpModal')
        .controller('HelpModal', HelpModal);


    /* ngInject */
    function HelpModal($modalInstance, $state) {

        var vm = this;

        vm.ok = function () {
            $modalInstance.close();
            $state.go('help_me');

        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }
})();
