faceApp.directive("fileread", [() => {
    return {
        scope: {
            fileread: "="
        },
        link: (scope, element, attributes) => {
            element.bind("change", changeEvent => {
                let file = changeEvent.target.files[0];
                if (!file || file.type.indexOf("image/") == -1) return;
                let reader = new FileReader();
                reader.onload = loadEvent => {
                    scope.$apply(() => {
                        scope.fileread = loadEvent.target.result;
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }
}]);