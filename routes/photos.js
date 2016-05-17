
var express = require('express');
var router = express.Router();
//var photos=[];
//photos.push({name:'node.js logo1',path:'http://img.ivsky.com/img/tupian/pre/201603/14/moorhen.jpg'});
//photos.push({name:'node.js logo2',path:'http://img.ivsky.com/img/tupian/pre/201603/14/moorhen.jpg'});
//photos.push({name:'node.js logo3',path:'http://img.ivsky.com/img/tupian/pre/201603/14/moorhen.jpg'});
//photos.push({name:'node.js logo4',path:'D:/NodeProjects/photo/public/photos/201510260906317344.jpg'});
//photos.push({name:'node.js logo4',path:'D:/NodeProjects/photo/public/photos/201510260906317344.jpg'});

var photo = require('../models/Photo');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

router.get('/',function(req,res,next){
    photo.find({}, function (err,photos) {
        if(err){
            return next(err);
        }
        res.render('photos',{title:'Photos',photos:photos}); //Ĭ�ϻ����ļ��µ�indexҳ��
    });
});
router.get('/photo/:id/download',function(req,res,next){
    var id=req.params.id;
    photo.findById(id, function (err,photo) {
        if(err){
            return next(err);
        }
        //��Ҫ�޸ģ���ʱʹ��ָ��·����__dirnameָ�����routes�ļ��� �����޷����ʵ�app.js�ڲ���photos����
        var path= 'D:/NodeProjects/photo/public/photos/' + photo.path;
        //console.log(app.get('photos'));
        //var path= app.get('photos')+ photo.path;
        //res.sendfile(path); ֱ����ҳ���д򿪣���û����ʾ�����ļ�
        res.download(path,photo.name+".jpeg");
    })
});
module.exports = router;