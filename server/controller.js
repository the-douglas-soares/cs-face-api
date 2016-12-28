
const oxford = require("project-oxford");

const oxfordCli = new oxford.Client("ef188a9ba3334efe87e3361a2d2cd65b");
const face = oxfordCli.face;

const custom = path => {
    return { returnFaceId: true, path: path }
}

const makeErr = image => {
    return { image: image, cause: "The image has no face" };
}

module.exports.index = (req, res) => {
    res.render('index');
};


module.exports.validate = (req, res) => {
    console.log(req.files);
    const files = req.files;
    let image1;
    if (!files || !files.length) {
        res.status(400).end();
    }
    console.log(files[0].path)
    face.detect(custom(files[0].path))
        .then(result => {
            if (!result.length) return Promise.reject(makeErr(1));
            image1 = result[0].faceId;
            return face.detect(custom(files[1].path));
        })
        .then(result => {
            if (!result.length) return Promise.reject(makeErr(2));
            return face.verify([image1, result[0].faceId]);
        })
        .then(result => res.json(result))
        .catch(err => {
            if (err.cause) {
                return res.status(400).json(err);
            }
            return res.status(500).json(err);
        });
};
