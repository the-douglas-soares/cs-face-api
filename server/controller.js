const oxford = require("project-oxford");

const oxfordCli = new oxford.Client("ef188a9ba3334efe87e3361a2d2cd65b");
const face = oxfordCli.face;

const custom = data => {
    return { returnFaceId: true, data: oxford.makeBuffer(data) }
}

const makeErr = image => {
    return { image: image, cause: "The image has no face" };
}

module.exports.index = (req, res) => {
    return res.render('index');
};


module.exports.validate = (req, res) => {
    const files = req.body;
    let image1;
    if (!files || !files.length) {
        return res.status(400).end();
    }
    return face.detect(custom(files[0]))
        .then(result => {
            if (!result.length) return Promise.reject(makeErr(1));
            image1 = result[0].faceId;
            return face.detect(custom(files[1]));
        })
        .then(result => {
            if (!result.length) return Promise.reject(makeErr(2));
            return face.verify([image1, result[0].faceId]);
        })
        .then(result => res.json(result))
        .catch(err => {
            console.log(err);
            if (err.cause) {
                return res.status(400).json(err);
            }
            return res.status(503).json(err);
        });
};
