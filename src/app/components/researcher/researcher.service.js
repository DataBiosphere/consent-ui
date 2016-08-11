(function () {
    'use strict';

    angular.module('cmResearcher')
        .service('cmResearcherService', cmResearcherService);

    /* ngInject */
    function cmResearcherService(ResearcherResource, ResearcherGetResource) {


        function getPropertiesByResearcherId(userId) {
            return ResearcherResource.List({userId: userId}).$promise;
        }

        function createResearcherProperties(researcherProperties, userId, validate) {
            return ResearcherResource.post({userId: userId, validate: validate},researcherProperties);
        }

        function updateResearcherProperties(researcherProperties, userId, validate) {
            return ResearcherResource.update({userId: userId, validate: validate}, researcherProperties);
        }

        function getResearcherPropertiesForDAR(userId) {
            return ResearcherGetResource.get({userId: userId}).$promise;
        }

        return {
            getPropertiesByResearcherId: function (userId) {
                return getPropertiesByResearcherId(userId);
            },
            createResearcherProperties: function (researcherProperties, userId, validate) {
                return createResearcherProperties(researcherProperties, userId, validate);
            },
            updateResearcherProperties: function (researcherProperties, userId, validate) {
                return updateResearcherProperties(researcherProperties, userId, validate);
            },
            getResearcherPropertiesForDAR: function (userId) {
                return getResearcherPropertiesForDAR(userId);
            }
        };
    }

})();
