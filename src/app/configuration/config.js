'use strict';

angular.module('ConsentConfiguration', [])
    .constant('apiUrl', G_APIURL)
    .constant('ontologyApiUrl', G_ONTOLOGYAPIURL)
    .constant('clientId', G_CLIENTID)
    .constant('gwasUrl', "http://epi.grants.cancer.gov/dac/examples.html")
    // .constant('nihUrl', NIH_URL);
    .constant('nihUrl', "http://mock-nih.dev.test.firecloud.org/link-nih-account/index.html?redirect-url=");
