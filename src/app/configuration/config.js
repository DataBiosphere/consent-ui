'use strict';

angular.module('ConsentConfiguration', [])
    .constant('apiUrl', G_APIURL)
    .constant('ontologyApiUrl', G_ONTOLOGYAPIURL)
    .constant('clientId', G_CLIENTID)
    .constant('gwasUrl', "http://epi.grants.cancer.gov/dac/examples.html")
    .constant('fireCloudUrl', "https://firecloud-orchestration.dsde-dev.broadinstitute.org/")
    .constant('nihUrl', "http://mock-nih.dev.test.firecloud.org/link-nih-account/index.html?redirect-url=");
