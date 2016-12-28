const faceApp = angular.module('faceApp', ['ngAnimate', 'toastr', 'ngProgress']);
faceApp.config(toastrConfig => {
    angular.extend(toastrConfig, {
        closeButton: true,
        positionClass: 'toast-top-center',
    });
});


