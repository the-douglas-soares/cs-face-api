'use strict';
class MainCtrl {
    constructor() {
        this.image1 = "http://placehold.it/400x300";
        this.image2 = this.image1;
    }

    verify() {
        console.log(this.image1)
        console.log(this.image2)
    }
}
faceApp.component("faceMain", {
    controller: MainCtrl,
    controllerAs: "ctrl",
    templateUrl: 'app/main/main.html'
});