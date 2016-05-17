var express = require('express');
var router = express.Router();
//router.get('/',photos.form);
//exports.form=function(req,res){
//    res.render('photos/upload',{title:'Photo upload'});
//}

//router.post('/',photos.submit(app.get('photos')));

router.get('/', function (req, res) {
    res.render('photos/upload', {title: 'Photo upload'})
});
var photo = require('../models/Photo');
var p = new photo();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

//暂时未添加文件的重命名，会有重复文件名上传失败的情况
router.post('/uploading', function (req, res) {

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/photos/'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        // console.log(fields.tname); //前台的字段名
        //生成multiparty对象，并配置上传目标路径
        var filesTmp = JSON.stringify(files, null, 2);
        //上传完成后处理
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.photoFile[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/photos/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
                p.name = fields.tname;
                p.path = inputFile.originalFilename;
                p.save(function (err) {
                    if (err) {
                        console.log('save failed');
                    }
                    console.log('save success');
                });
            });
        }

        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: filesTmp}));
    });
});

router.post('/up', function (dir) {
    //console.log(dir);
    return function (req, res, next) {
        var img = req.files.photo.image;
        var name = req.body.photo.name || img.name;

        console.log(req.files);
        var path = join(dir, img.name);
        fs.rename(img.path, path, function (err) { //重命名文件
            if (err) {
                return next(err);
            }

            p.name = name;
            p.path = img.name;
            p.save(function (err) {
                if (err) {
                    console.log('save failed');
                }
                console.log('save success');
            })
        });
    };
});
//module.exports.form= function (req,res) {
//    res.render('photos/upload',{title:"Photo upload"})
//}
module.exports = router;