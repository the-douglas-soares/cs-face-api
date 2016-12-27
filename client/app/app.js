const faceApp = angular.module('faceApp', ['ngAnimate', 'toastr', 'ngProgress']);
faceApp.config(toastrConfig => {
    angular.extend(toastrConfig, {
        maxOpened: 0,
        closeButton: true,
        positionClass: 'toast-top-center',
        preventDuplicates: true
    });
});


