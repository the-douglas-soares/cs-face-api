'use strict';
class MyImage {
    constructor(url, data = {}) {
        this.url = url;
    }
}
class MainCtrl {


    constructor() {
        this.image1 = new MyImage("http://placehold.it/400x300");
        this.image2 = new MyImage("http://placehold.it/400x300");
    }

    verify() {
        console.log(image1)
    }

};

// MainCtrl.$inject = ['$scope'];

faceApp.component("faceMain", {
    controller: MainCtrl,
    controllerAs: "ctrl",
    templateUrl: 'app/main/main.html'
})