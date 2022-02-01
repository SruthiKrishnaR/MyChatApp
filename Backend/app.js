var express = require('express');
const app = express();
var cors = require('cors')
var path = require('path');
var userdata=require('./src/modal/userData')
var bcrypt=require('bcrypt')
var privateData = require('./src/modal/privateData')

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5200;

app.post('/signup',async(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    console.log(req.body);
    var item={
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        status:'offline'
    }
    userdata.findOne({email:item.email})
    .then(async(data)=>{
        if(data){
          res.status(401).send('User Already Exist')
        }else{
            item.password=await bcrypt.hash(item.password,10)
            let user = new userdata(item)
            user.save(
                err=>{
                    console.log(err);
                    res.send(err)
                },
                data=>{
                    console.log("Registration Successfull");
                    res.send()
                }  
            )
        }
    })
})

app.post('/login',(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    console.log(req.body);
    userdata.findOne({email:req.body.email},(err,user)=>{
        console.log(user);
        if(user){
            bcrypt.compare(req.body.password,user.password)
            .then((response)=>{
                if(response){
                    console.log("user");
                    // let payload = {subject: req.body.student.email+req.body.student.password}
                    // let token = jwt.sign(payload, 'studentKey')
                    // res.status(200).send({token,role:'student',id:student._id})
                    req.body.status = "online";
                    console.log(req.body.status);
                    res.send()
                   
                }else{
                    res.status(401).send('Invalid user Password')
                }
            })   
        }else{
            res.status(401).send('Invalid credential')
        }
    })
})

console.log("b4 connection");

io.on('connection', (socket) => {
    console.log("a user connected");
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {

        var chatdata={
            // user:data.user,
            message:data,
            // room:data.room
          }

        var chatdata = new privateData(chatdata);
        chatdata.save();
        // console.log(data);
        io.emit('new message', { message: data});
    });
});



server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

module.exports = app;