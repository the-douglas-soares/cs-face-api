'use strict';
class MainCtrl {
    constructor(toastr, $http, ngProgressFactory) {
        this.dummy = "http://placehold.it/400x300";
        this.toastr = toastr;
        this.http = $http;
        this.progress = ngProgressFactory.createInstance();
    }

    _convert(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File(ia, "" + new Date().getDate(), { type: mimeString });
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
        let headers = { 'Content-Type': 'multipart/form-data' };
        var fd = new FormData(document.forms[0]);
        
        let blob = this._convert(this.image1);
        console.log(blob);
        fd.append("canvasImage", blob);

        this.http.post('/validate', fd)
            .then(result => { console.log(result); this.progress.complete(); })
            .catch(err => { console.log(err); this.progress.complete() });
    }
}
faceApp.component("faceMain", {
    controller: MainCtrl,
    controllerAs: "ctrl",
    templateUrl: 'app/main/main.html'
});