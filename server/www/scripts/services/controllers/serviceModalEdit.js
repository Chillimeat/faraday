// Faraday Penetration Test IDE
// Copyright (C) 2013  Infobyte LLC (http://www.infobytesec.com/)
// See the file 'doc/LICENSE' for the license information

angular.module('faradayApp')
    .controller('serviceModalEdit',
        ['$q', '$scope', '$modalInstance', '$routeParams', 'SERVICE_STATUSES', 'service', 'servicesManager', 'commonsFact', 'servicesManager',
        function($q, $scope, $modalInstance, $routeParams, SERVICE_STATUSES, service, servicesManager, commonsFact, servicesManager) {

        init = function() {
            // current Workspace
            var ws = $routeParams.wsId;

            if(service.length == 1) {
                $scope.data = {
                    "name": service[0].name,
                    "description": service[0].description,
                    "owned": service[0].owned,
                    "owner": service[0].owner,
                    "ports": service[0].ports,
                    "protocol": service[0].protocol,
                    "parent": service[0].parent,
                    "status": service[0].status,
                    "version": service[0].version,
                };
            }
            $scope.servicesSelected = service;

            $scope.statuses = SERVICE_STATUSES;
        };

        $scope.ok = function() {
            var date = new Date(), updateAll = [];
            var ws = $routeParams.wsId;
            timestamp = date.getTime()/1000.0;

            for (var i = 0; i < $scope.servicesSelected.length; i++) {
                console.log($scope.servicesSelected[i]._id);
                updateAll.push(servicesManager.getService($scope.servicesSelected[i]._id, ws, false).then(function(serviceObj){
                    console.log(serviceObj._id);
                    $scope.data['_id'] = serviceObj._id;
                    return servicesManager.updateService(serviceObj, $scope.data, $routeParams.wsId);
                }));
            }

            $q.all(updateAll).then(function(){
                $modalInstance.close($scope.data);
            }, function(response) {
                if (response.status == 409) {
                    commonsFact.showMessage("Error while updating a new Vulnerability " + response.data.name + " Conflicting Vulnarability with id: " + response.data.object._id + ". " + response.data.message);
                } else {
                    commonsFact.showMessage("Error from backend: " + response.status);
                }

            })
        };

        $scope.call = function(service) {
            $scope.data = {
                "name": service.name,
                "description": service.description,
                "owned": service.owned,
                "ports": service.ports,
                "protocol": service.protocol,
                "status": service.status,
                "version": service.version,
            };
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        init();
    }]);
