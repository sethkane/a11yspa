var express         =       require("express");
var multer          =       require('multer');
var fs              =       require('fs');
var app             =       express();
var upload          =       multer();
var err = false;

var upload = multer({ dest: './public/files/'});

app.use(express.static('public'));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});


app.post('/post', upload.any(), function (req, res, next) {
  
  console.log(req.files)
  console.log(req.body);

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
