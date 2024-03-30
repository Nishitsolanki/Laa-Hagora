const hbjs = require('handbrake-js'); //converter package
const Video = require('../models/video');
const path =  require('path')
const sendUserCreationEmail = require('../mail/sendAccountCreationMail')

exports.convertVideo = async (req, res) => {
    const input = path.join(req.file.destination, req.file.filename);
    const format = req.body.format;
    const email = req.body.email

    if (!format) {
        return res.status(400).send("Error: Format not specified");
    }

    const output = 'output/' + Date.now() + format;

    const video = new Video({
        filename: req.file.filename,
        format: format,
        output: output,
        email:email
    });

    try {
        await video.save();

        hbjs.spawn({ input: input, output: output })
            .on('error', err => {
                console.log("Conversion failed", err);
                res.status(500).send("Conversion failed");
            })
            .on('progress', progress => {
                if (progress.percentComplete === 100) {
                    console.log("Conversion complete");
                    sendUserCreationEmail({
                        email,
                      });
                    res.status(200).send("Conversion complete");
                }
            });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred while saving video details");
    }
};