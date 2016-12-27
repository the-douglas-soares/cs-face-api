faceApp.directive("ngCamera", [() => {
    return {
        'restrict': 'E',
        'scope': {
            'notifier': '@',
            'snapshot': '='
        },
        'template': `
            <div class="img-responsive img-box"  id="ng-camera-feed"></div>
            <div class="col m-5 text-center">
                <button class="btn btn-primary" ng-click="getSnapshot()">Capture</button>
            </div>`,
        'link': scope => {
            scope.libraryLoaded = false;
            scope.cameraLive = false;
            scope.activeCountdown = false;

            Webcam.set({
                image_format: 'png',
                width: 400,
                height: 300
            });
            Webcam.attach('#ng-camera-feed');

            Webcam.on('load', () => scope.$apply(() => scope.libraryLoaded = true));
            Webcam.on('live', () => scope.$apply(() => scope.cameraLive = true));
            Webcam.on('error', error => console.error(error));

            scope.getSnapshot = () => {
                Webcam.snap((data_uri, data1, data2, data3, data4) => {
                    scope.snapshot = data_uri;
                    scope.$parent.ctrl[scope.notifier]();
                });
            };
            scope.$on('$destroy', () => Webcam.reset());
        }
    }
}]);