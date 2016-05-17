var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');
var schema=new mongoose.Schema({
    name:String,
    path:String
});
mongoose.model('Photo',schema);




/* open db */
/*
db.open(function(err) {
    if(err){console.log(err);throw err}
     //Select 'contact' collection
    db.collection('contact', function(err, collection) {
        /!* Insert a data *!/
        collection.insert({
            name: 'Fred',
            email: 'cfsghost@gmail.com'
        }, function(err, data) {
            if (data) {
                console.log('Successfully Insert');
            } else {
                console.log('Failed to Insert');
            }
        });

        /!* Querying *!/
        collection.find({ "name": 'Fred' }, function(err, data) {
            /!* Found this People *!/
            if (data) {
                console.log(data);
                console.log('Name: ' + data.name + ', email: ' + data.email);
            } else {
                console.log('Cannot found');
            }
        });
    });
});*/
