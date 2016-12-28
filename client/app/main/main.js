'use strict';
class MainCtrl {
    constructor(toastr, $http, ngProgressFactory) {
        this.dummy = "http://placehold.it/400x300";
        this.toastr = toastr;
        this.http = $http;
        this.progress = ngProgressFactory.createInstance();
        this.http = $http;
    }

    switch() {
        this.calledCam = !this.calledCam;
    }

    verify() {
        if (!this.image1) {
            return this.toastr.error('You must upload a image', 'Error');
        }
        if (!this.image2) {
            return this.toastr.error('You must also capture a photo', 'Error');
        }
        this.progress.start();
        this.enable = false;
        this.http.post('/validate', [this.image1, this.image2])
            .then(response => {
                this.enable = true;
                let result = response.data;
                this.progress.complete();
                if (response.data.isIdentical) {
                    return this.toastr.success("Images are from the same person", "Match");
                }
                this.toastr.info("Images are from different people", "Oh oh!");
            })
            .catch(err => {
                this.enable = true;
                this.progress.complete();
                if (err.status === 400) {
                    return this.toastr.error(err.data.cause, "Image " + err.data.image);
                }
                this.toastr.warn("Try again later", "Service Unavailable");
            });
    }
}
faceApp.component("faceMain", {
    controller: MainCtrl,
    controllerAs: "ctrl",
    templateUrl: 'app/main/main.html'
});