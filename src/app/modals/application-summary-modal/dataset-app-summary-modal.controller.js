(function () {
    'use strict';

    angular.module('cmApplicationModal')
        .controller('DatasetSummaryModal', DatasetSummaryModal);

    /* ngInject */
    function DatasetSummaryModal($modalInstance, $scope, dataSet, consent) {

        var vm = this;

        $scope.DatasetId = dataSet.properties.filter(function (p){
            return p.propertyName === "Dataset ID"})[0].propertyValue;


        $scope.DatasetName = dataSet.properties.filter(function (p){
                     return p.propertyName === "Dataset Name"})[0].propertyValue;

        $scope.DataType = dataSet.properties.filter(function (p){
                     return p.propertyName === "Data Type"})[0].propertyValue;


        $scope.Species = dataSet.properties.filter(function (p){
                            return p.propertyName === "Species"})[0].propertyValue;


        $scope.Indication = dataSet.properties.filter(function (p){
                     return p.propertyName === "Phenotype/Indication"})[0].propertyValue;


        $scope.nrParticipants = dataSet.properties.filter(function (p){
                     return p.propertyName === "# of participants"})[0].propertyValue;

        $scope.Description = dataSet.properties.filter(function (p){
                     return p.propertyName === "Description"})[0].propertyValue;

        $scope.DataDepositor = dataSet.properties.filter(function (p){
                             return p.propertyName === "Data Depositor"})[0].propertyValue;

        $scope.PI = dataSet.properties.filter(function (p){
                                     return p.propertyName === "Principal Investigator(PI)"})[0].propertyValue;

        $scope.consentName = consent.name;
        $scope.translatedUseRestriction = consent.translatedUseRestriction;



        vm.ok = function () {
            $modalInstance.close();
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        vm.singleModel = 0;
        vm.radioModel = '';
        vm.checkModel = {
            admin: false,
            researcher: false
        };

    }

})();
