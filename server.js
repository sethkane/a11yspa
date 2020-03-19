var express         =       require("express");
var multer          =       require('multer');
var fs              =       require('fs');
var app             =       express();
var upload          =       multer();
var dir = './public/files/';
var err = false;

app.use(express.static('public'));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
 
var upload = multer({ 
    storage: storage
  })

app.post('/post', upload.any(), function (req, res, next) {
  
    var json;
    var size = req.headers['content-length'];

      if(err){
        res.writeHead(500, {"Content-Type": "text/html"});
        json = JSON.stringify({ 
          error: {
            bytesRead: 0
          }
        });

      } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        json = JSON.stringify({ 
          success: {
            bytesRead: size
          }
        });
      }
      
      res.end(json);

});


app.listen(process.env.PORT || 3131,function(){
  console.log(`Working on port ${process.env.PORT || 3131}`);
});
