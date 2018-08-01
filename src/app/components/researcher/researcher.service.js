(function () {
    'use strict';

    angular.module('cmResearcher')
        .service('cmResearcherService', cmResearcherService);

    /* ngInject */
    function cmResearcherService(ResearcherResource, ResearcherGetResource, ResearcherNihResource) {


        function getPropertiesByResearcherId(userId) {
            return ResearcherResource.List({userId: userId}).$promise;
        }

        function createResearcherProperties(researcherProperties, userId, validate) {
            return ResearcherResource.post({userId: userId, validate: validate},researcherProperties);
        }

        function updateResearcherProperties(researcherProperties, userId, validate) {
            console.log("llamando update del Researcher");
            return ResearcherResource.update({userId: userId, validate: validate}, researcherProperties);
        }

        function verifyNihToken(researcherProperties, userId) {
            console.log("Validando NIH");
            return ResearcherNihResource.update({userId: userId, token: researcherProperties.eraToken}, researcherProperties).$promise;
        }

        function getResearcherPropertiesForDAR(userId) {
            console.log("llama get");
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
            },
            verifyNihToken: function(researcherProperties, userId) {
                return verifyNihToken(researcherProperties, userId);
            }
        };
    }

})();
