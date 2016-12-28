'use strict';
class MainCtrl {
    constructor(toastr, $http, ngProgressFactory, Upload) {
        this.dummy = "http://placehold.it/400x300";
        this.toastr = toastr;
        this.http = $http;
        this.progress = ngProgressFactory.createInstance();
        this.http = Upload;
    }

    static convert(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        let i;
        for (i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File(ia, `${new Date().getDate()}`, {type: mimeString});
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
        let files = [MainCtrl.convert(this.image1), MainCtrl.convert(this.image2)];
        this.http.upload({
            url: '/validate',
            arrayKey: '',
            data: {
                files
            }
        }).then(function (response) {
            this.progress.complete();
            console.log(response);
        }.bind(this), function (response) {
            this.progress.complete();
            console.log("Err", response);
        }.bind(this), function (evt) {
            let progress =
                Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            this.progress.set(progress);
        }.bind(this));
    }
}
faceApp.component("faceMain", {
    controller: MainCtrl,
    controllerAs: "ctrl",
    templateUrl: 'app/main/main.html'
});