(function () {
    'use strict';

    describe('cmUserConsole', function () {


        describe('Controller: UserConsole', function () {

            var UserConsoleController, cmPendingServiceMock;

            beforeEach(function () {
                cmPendingServiceMock = {
                    findDataRequestPendingCasesByUser: function () {
                    },
                    findConsentPendingCasesByUser: function () {
                    },
                    findSummary: function () {
                    },
                    findConsentUnReviewed: function (){
                    },
                    findDARUnReviewed: function (){
                    },
                    findDataOwnerUnReviewed: function (){
                    }
                };
            });

            beforeEach( function(){
                module('cmUserConsole');
            });


            it('should ....', inject(function ($controller) {
                //spec body
                var currentUser = {'dacUserId': 123};
                var scope = {'currentUser': currentUser};
                UserConsoleController = $controller('UserConsole', {
                    cmPendingCaseService: cmPendingServiceMock, $rootScope: scope
                });

                expect(UserConsoleController).toBeDefined();
            }));

        });
    });

})();
