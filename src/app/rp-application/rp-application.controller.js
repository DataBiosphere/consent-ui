(function () {
    'use strict';

    angular.module('cmRPApplication')
        .controller('RPApplication', RPApplication);

    /* ngInject */
    function RPApplication($state) {

        var vm = this;

        vm.$state = $state;
        // we will store all of our form data in this object
        vm.formData = {};

        //function to process the form
        vm.processForm = function () {
            alert('awesome!');
        };

    }

})();

