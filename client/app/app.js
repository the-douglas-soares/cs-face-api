const faceApp = angular.module('faceApp', ['ngAnimate', 'toastr', 'ngProgress', 'ngFileUpload']);
faceApp.config(toastrConfig => {
    angular.extend(toastrConfig, {
        maxOpened: 0,
        closeButton: true,
        positionClass: 'toast-top-center',
        preventDuplicates: true
    });
});


