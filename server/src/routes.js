const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const LipstickController = require('./controllers/LipstickController');

let multer = require("multer");

module.exports = (app) => {
    // upload section
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./public/uploads");
        },
        filename: function (req, file, callback) {
            console.log(file);
            callback(null, file.originalname);
        }
    });

    let upload = multer({ storage: storage }).array("userPhoto", 10);

    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/lipstick', LipstickController.create);
    app.put('/lipstick/:lipstickId', LipstickController.put);
    app.delete('/lipstick/:lipstickId', LipstickController.remove);
    app.get('/lipstick/:lipstickId', LipstickController.show);
    app.get('/lipstick', LipstickController.index);

    // upload
    app.post("/upload", function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    //delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs');
            console.log(req.body.filename)
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename,
                (err) => {
                    if (err) throw err;
                    res.send("Delete successful");
                });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete the file'
            });
        }
    });
}
