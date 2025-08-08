require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const axios = require('axios');
const { body } = require('express-validator');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');
const stream = require("stream");
const { customAlphabet } = require('nanoid');
const autoIncrement = require("mongoose-sequence")(mongoose);

var accountan = path.join(process.cwd(),'./data.json')
 var accounts = JSON.parse(fs.readFileSync(accountan,'utf-8'));

 var accountano = path.join(process.cwd(),'./nam.json')
 var accountso = JSON.parse(fs.readFileSync(accountano,'utf-8'));

 var accountanop = path.join(process.cwd(),'./tyi.json')
 var accountsoio = JSON.parse(fs.readFileSync(accountanop,'utf-8'));


//function keepServerAwaike() {
//  http.get('https://mymongoose.onrender.com', (res) => {
//    console.log(`Status Code: ${res.statusCode}`);
//}).on('error', (e) => {
//  console.error(`Error: ${e.message}`);
//});
//}

// Schedule the task to run every 5 minutes
//cron.schedule('*/14 * * * *', () => {
//  console.log('Sending keep-alive request to server...');
// keepServerAwaike();
//});

// Google Drive API setup

const serverUrl = 'https://namsimsu.mydatabase.com.ng';

const keepAlive = () => {
    axios.get(serverUrl)
        .then(response => {
            console.log(`server response with status:${response.status}`)
        })
        .catch(error => {
            console.log(`error keeping server alive:${error.message}`)
        })
}

const oauth2Client = new google.auth.OAuth2(
    '299799989715-9j5t32aoriem1chgjkd1d91vleh9njni.apps.googleusercontent.com',
    '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',
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({ refresh_token: '1//04SleHQlO68aLCgYIARAAGAQSNwF-L9IrZKYFd3YWazjkliZA_Z3tO98_P1q76Eb-_zLAugY-fN2A6M0kHNABfJL9OEnrB90YC3c' });

const drive = google.drive({ version: 'v3', auth: oauth2Client });


//function keepServerAwaike() {
//axios.get('https://mymongoose.onrender.com', (res) => {
// console.log(`Status Code: ${res.statusCode}`);
//}).on('error', (e) => {
//console.error(`Error: ${e.message}`);
//});
//}

//Schedule the task to run every 5 minutes
cron.schedule('*/14 * * * *', () => {
    console.log('Sending keep-alive request to server...');
    keepAlive;
});

console.log('Keep-alive script started.');



const app = express()
const PORT = process.env.PORT || 8000

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//const uid = function Generateuniquid() { return ('0000' + (Math.random() * (100000 - 101) + 101) | 0).slice(-5); }



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



var NoteSchemer = new Schema({
    field: { type: String, default: () => uuidv4(), required: true },
       Aname: {
        Name: { type: String, uppercase: true },
        Mname: { type: String, uppercase: true },
        Surname: { type: String, uppercase: true }
    },
    fullname: { type: String, uppercase: true },
    State: { type: String, uppercase: true },
    LocalGovt: { type: String, uppercase: true },
    Sex: { type: String, uppercase: true },
    Bloodgroup: { type: String, uppercase: true },
    Gender: { type: String, uppercase: true },
    Bloodgroup: { type: String, uppercase: true },
    PhoneNo: { type: String, uppercase: true },
    EmergencyNo: { type: String, uppercase: true },
    RegNo: { type: String, uppercase: true, unique: true },
    Validity: { type: String, uppercase: true },
    picturepath: { type: String },
    imgurl: { type: String },
    imgurli: { type: String },
    time: { type: String, uppercase: true }
},
{ id: false},);

NoteSchemer.plugin(autoIncrement, {inc_field:'id'});


var Note = mongoose.model("Note", NoteSchemer);

app.use('/public', express.static(path.join(__dirname + '/public')));
//app.use(express.static(path.join(__dirname, 'public')));

const uuidfh = customAlphabet('123456890',5);

async function uploadImageToGoogleDrive(file) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    const uuid = uuidfh() + '.jpg';
    const fileMetadata = {
        name: uuid,
        //name: file.originalname,
        parents: ["10KpoRo-jHT62ko_7BNH9khxA2S_6GY42"],
    };

    const media = {
        mimeType: file.mimetype,
        body: bufferStream
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,webViewLink,name'
    });

    return response.data
}
function sanitizeUser(user) {
  const { PhoneNo, EmergencyNo, ...safe } = user;
  return safe;
}

app.get('/detail', async(req, res) => {
    try {
          const data = await Note.find().sort({_id:-1});
          res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//User.find({}, '-password -token') // Exclude password and token
  //.then(users => res.json(users));


const serverUrli = 'http://localhost:8080/card/';

app.get('/qrcar/:_id', function (req, res,next) {
    try{
        const id = req.params._id;
       const data = axios.get(serverUrli + id)
       const founduser = res.json(data)
        console.log(founduser);
        if (!founduser ) {
          return res.status(404).send('no user found')
    }
    res.render('qrcard', {data:founduser})
            } catch (err){
    res.status(500).send('error ocĉured');
        }
  });

  app.get('/getall', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
    const data = accounts;
    res.json(data)
  });

    app.get('/getlit', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
    const data = accountsoio;
    res.json(data)
  });

   app.get('/fulllist', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Header", "*");
    const data = accountso;
    res.json(data)
  });

   app.get('/qrcard/:_id', function(req, res, next) {
     try{
  const foundUser = accountsoio.find(x => x._id === req.params._id);
  console.log(foundUser)
  //const jsonString = JSON.stringify(foundUser);
     if (!foundUser ) {
          return res.status(404).send('no user found')
    }
    res.render('qrcard', {data:foundUser})
            } catch (err){
    res.status(500).send('error ocĉured');
        }
  });

//EDIT
app.get('/qrcardo/:id', async(req, res) => {
const {id} = req.params;
try{
  const founduser = await Note.findById(id);
  if (!founduser){
    return res.status(404).send('no user found')
  }
    res.render('qrcard', {data:founduser})
} catch (err){
res.status(500).send('error ocĉured');
}
});


app.get('/ASSA', async(req, res) => {
    try {
        const data = await Note.find();
        const dataa = data.filter(o => o.School === 'AMARAKU SECONDARY SCHOOL AMARAKU')
        res.json(dataa);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//EDIT
app.get('/poli/:_id', async(req, res) => {
  //const founduser = accountsoio.find(x => x._id === req.params._id);
//const {id} = req.params;
try{
  const founduser = accountsoio.find(x => x._id === req.params._id);
  //const founduser = await Note.findById(id);
  if (!founduser){
    return res.status(404).send('no user found')
  }
    res.render('result', {data:founduser})
} catch (err){
res.status(500).send('error ocĉured');
}
});

   app.get('/:oooo_id', function(req, res, next) {
     try{
  const foundUser = accountsoio.find(x => x._id === req.params._id);
  console.log(foundUser)
  //const jsonString = JSON.stringify(foundUser);
     if (!foundUser ) {
          return res.status(404).send('no user found')
    }
    res.render('result', {data:foundUser})
            } catch (err){
    res.status(500).send('error ocĉured');
        }
  });

app.get('/card/:id', async(req, res) => {
const {id} = req.params;
try{
  const founduser = await Note.findById(id);
  if (!founduser){
    return res.status(404).send('no user found')
  }
    res.render('result', {data:founduser})
} catch (err){
res.status(500).send('error ocĉured');
}
});

//UPDATE ROUT
app.post('/edititt/:_id', async (req, res) => {
  const {id} = req.params._id;
  try{
    const founduser = await Note.findById(id);
    if (!founduser){
      return res.status(404).send('no user found')
    }
    founduser.Sexr = req.body.Sex,
    founduser.Bloodgroup= req.body.Bloodgroup,
    founduser.PhoneNumber= req.body.PhoneNo,
    founduser.EmergencyNo= req.body.EmergencyNo,
    founduser.Validity= req.body.Validity,
    founduser.State= req.body.State,
    founduser.LocalGovt= req.body.LocalGovt,
    founduser.picturepath = req.body.picturepath,
    founduser.imgurli = req.body.imgurli,           
  
  await founduser.save();
  res.redirect('/' + req.params.id)

  } catch (err){
  res.status(500).send('error occured');
  }
  });

  //EDIT
app.get('/gt/:id', async(req, res) => {
const {id} = req.params;
try{
  const founduser = await Note.findById(id);
  if (!founduser){
    return res.status(404).send('no user found')
  }
    res.render('edit', {data:founduser})
} catch (err){
res.status(500).send('error ocĉured');
}
});

//new
app.get('/new', (req, res) => {

  try{
    
      res.render('user')
  } catch (err){
  res.status(500).send('error ocĉured');
  }
  });
     
//UPDATE ROUT
app.post('/editit/:id', async(req, res) => {
const {id} = req.params;
try{
  const founduser = await Note.findById(id);
  if (!founduser){
    return res.status(404).send('no user found')
  }
    founduser.Aname.Name = req.body.Name,
    founduser.Aname.Mname = req.body.Mname,
    founduser.Aname.Surname = req.body.Surname,
    founduser.RegNo = req.body.RegNo,
    founduser.Sex = req.body.Gender,
    founduser.Bloodgroup= req.body.Bloodgroup,
    founduser.PhoneNo= req.body.PhoneNumber,
    founduser.EmergencyNo= req.body.EmergencyNo,
    founduser.State= req.body.State,
    founduser.LocalGovt= req.body.LocalGovernment,          
  
  await founduser.save();
  res.redirect('/' + req.params.id)

  } catch (err){
  res.status(500).send('error occured');
  }
  });

app.post("/", upload.single('image'), async(req, res) => {
    try {
        const Pathoo = await uploadImageToGoogleDrive(req.file);
       const imagePath = 'image/' + Pathoo.name;
        const urli =  Pathoo.webViewLink;
        const urlii =  'https://lh3.googleusercontent.com/d/' + Pathoo.id + '=s400?authuser=0';

        function pad(n) {
            return n < 10 ? '0' + n : n;
        }

        // Get the current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = pad(now.getMonth() + 1); // Months are zero-based
        const day = pad(now.getDate());
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());

        // Format the date and time
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


        let newNote = new Note({
            Aname: {
                 Name: req.body.Name,
                 Mname: req.body.Mname,
                 Surname: req.body.Surname
             },
            fullname: req.body.fullname,
            State: req.body.State,
            LocalGovt: req.body.LocalGovt,
            Sex: req.body.Sex,
            Bloodgroup: req.body.Bloodgroup,
            PhoneNo: req.body.PhoneNo,
            EmergencyNo: req.body.EmergencyNo,
            RegNo: req.body.RegNo,
            Validity: req.body.Validity,
            picturepath: imagePath,
            //picturepath: req.body.imagePath,
            imgurl: urli,
            imgurli: urlii,
            //imgurli: req.body.urlii,
            time: formattedDate,
            
        });
        const {RegNo} = req.body;
        const exist = await Note.findOne({ RegNo });
          if (exist) {
         res.send('<h1 style="font-size:6rem;margin-top:15rem;text-align:center;justify-self:center;">Already exist<h1>');
          }
        await newNote.save();
        res.redirect(`sample.html`)
    } catch (error) {
        res.status(500).send('Error saving data');
    } //finally {
    //fs.unlinkSync(req.file.path); // Clean up the uploaded file
    //}
    //res.json({message: `Post added successfully! Your Post Id is ${newPost.id}`,});
    //res.redirect("/"); <h1 style="font-size:5rem; margin-top:0rem;text-align: center;">${newNote.EmergencyNo}</h1>
})

    //app.listen(PORT, () => {
        //console.log("listening for requests");
   //})




connectDB().then(() => {
   app.listen(PORT, () => {
   console.log("listening for requests");
  })
});
