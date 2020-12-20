const express = require('express');
const fs = require('fs');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');

const path = require('path');

const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));


app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, './public', '/index.html'));
})
app.get("/images", (req,res) => {
    let arr = JSON.parse(fs.readFileSync('./photos.json', 'utf8'));
    res.send(arr);
})

app.post('/upload-file', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let fileToUpload = req.files.fileToUpload;
            const fileName = new Date().getTime() + fileToUpload.name;
            fileToUpload.mv('./public/uploads/' + fileName);
            const caption = req.body.caption;
            const newFile = {
                caption: caption,
                name: fileName
            }
            let arr = JSON.parse(fs.readFileSync('./photos.json', 'utf8'));
            arr.push(newFile);
            const json = JSON.stringify(arr);
            fs.writeFileSync('./photos.json',json);
            res.sendFile(path.join(__dirname, './public', '/gallery.html'));
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})