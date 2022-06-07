const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const _=require('lodash')
const session = require('express-session')

const connectionURL = 'mongodb+srv://eden:Eden1234@cluster0.f47ue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const databaseName = 'tommy'

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
const fs = require('fs');
const { result } = require('lodash')
var ObjectID = require('mongodb').ObjectId;

var crypt = new Crypt();
var rsa = new RSA();

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const publicDirectoryPath = path.join(__dirname, '../public')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var card1=-1, card2=-1



app.use(express.static(publicDirectoryPath))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))
flag = false


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('flipped', (msg) => {
        console.log('flip: ' + msg);
        if(card1===-1)
        {
            card1 = msg
            console.log("c1", card1, card2)
        }
        else if(card1!=-1&&card2===-1){
            card2 = msg
            console.log("c2", card2)
        }
        if(card1==card2)
            socket.emit('correct',card1)
    });
  });

app.get('/help', (req,res)=>{
    [public, private] = Keys()
    res.send(public)
})

app.get('/key', (req, res) => {
    let {publicKey, privateKey} = getOrCreateKeys()
    res.send(publicKey)
})

app.post('/signUp', async (req, res) => {
    const { username, email, password } = req.body;
    const isusernameOrEmailExist = await checkUsernameOrEmailExist(username, email)
    console.log("is" + isusernameOrEmailExist)
    if (isusernameOrEmailExist == "username") {
        res.status(200).send('Username already exist');
    }
    else if (isusernameOrEmailExist == "email") {
        res.status(200).send('Username already exist');
    }
    else {
        addUser(username, password, email)
        sendMail(email)
        res.status(201).send('created')
    }

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const isExist = await checkUserExist(username, password)
    if (isExist == true) {
        req.session.username = username
        res.status(200).send('ok');
    }
    else {
        res.status(200).send('not');
    }
})

app.post('/addGame', async (req, res) => {
    const username = req.session.username
    const gameId = await addGame(username)
    res.status(201).send(gameId)
})

app.get('/getGames', async (req, res) => {
    res.status(200).send(await getGames())
})

app.post('/joinGame', async (req, res) => {
    const player2 = req.session.username
    const {_id} = req.body
    console.log(_id, req.session.username)
    joinGame(_id ,player2)
    res.status(201).send('joined')
})

app.get('/getGame/:id', async (req, res) => {
    const db = await getDB();
    res.status(200).send(await getGame(req.params.id))
})

app.post('/update/:id', async (req, res) => {
    const { board, score1, score2, nextPlayer } = req.body
    updateGame(req.params.id, board, score1, score2, nextPlayer)
   console.log("updated")
})



server.listen(3000, () => { console.log('sever is up on port 3000') })

async function getGame(_id){
    const db = await getDB();
    const result = await db.collection("games").findOne({'_id': ObjectID(_id)})
    console.log("game", result)
    return result
}

function getOrCreateKeys() {
    let privateKey
    let publicKey
    try {
        publicKey = fs.readFileSync("public.pem").toString()
        privateKey = fs.readFileSync("private.pem").toString()
    }
    catch (error) {
        console.error(error)
    }
    if (publicKey && privateKey) {
        return {publicKey, privateKey}
    }
    else {
        rsa.generateKeyPairAsync().then(keyPair => {
            publicKey = keyPair.publicKey
            privateKey = keyPair.privateKey
            fs.writeFileSync("public.pem", Buffer.from(publicKey))
            fs.writeFileSync("private.pem", Buffer.from(privateKey))
            return {publicKey, privateKey}
        })
    }
}

async function getDB() {
    const client = await MongoClient.connect(connectionURL)
    return client.db(databaseName)
}

async function addUser(username, password, email) {
    const db = await getDB();
    db.collection('users').insertOne({
        username, password, email
    })
}

async function updateGame(id, board, nextPlayer)
{
    console.log("updated")
    const db = await getDB();
    var myquery = { _id: id };
    var newvalues = { $set: {'board':board ,'score1':score1, 'score2':score2, 'nextPlayer': nextPlayer} };
  const res = await db.collection('games').updateOne(myquery, newvalues)
    console.log("res", res);
  }


async function addGame(player1) {
    const db = await getDB();
    board = createBoard()
    const res =await db.collection('games').insertOne({
        player1, board, score1:0, score2:0, 'nextPlayer':player1
    })
    console.log(res.insertedId)
    return( res.insertedId)
}

function createBoard(){
    board =[]
    board[0]=board[1]='A'
    board[2]=board[3]='B'
    board[4]=board[5]='C'
    board[6]=board[7]='D'
    board[8]=board[9]='E'
    board[10]=board[11]='F'
    board[12]=board[13]='G'
    board[14]=board[15]='H'
    board[16]=board[17]='I'
    board[18]=board[19]='J'
    board[20]=board[21]='K'
    board[22]=board[23]='L'
    board[24]=board[25]='M'
    board[26]=board[27]='N'
    board[28]=board[29]='O'
    board[30]=board[31]='P'
    board[32]=board[33]='Q'
    board[34]=board[35]='R'
    return _.shuffle(board)
}

async function getGames(){
    const db = await getDB();
    const result = await db.collection("games").find({}).toArray();
    return result
}

async function checkUserExist(username, password) {
    //בדיקה שהמשתמש קיים בבסיס הנתונים 
    const db = await getDB();
    const result = await db.collection("users").findOne({ 'username': username });
    const {publicKey, privateKey} = getOrCreateKeys()
    if (result != null) {
            const decrypted = crypt.decrypt(privateKey, result.password);
            console.log(decrypted, result.password)
            if (decrypted.message == password)
            return true;
        return false;
    }
    return false;
}

async function checkUsernameOrEmailExist(username, email) {
    //בדיקה שהמשתמש לא קיים בבסיס הנתונים ולכן יכול להירשם
    const db = await getDB();
    const result1 = await db.collection("users").findOne({ 'username': username });
    const result2 = await db.collection("users").findOne({ 'email': email });
    if (result1 != null) {
        return "username";
    }
    else if (result2 != null) {
        return "email";
    }
    return "good";
}

async function joinGame(_id, player2)
{
    const db = await getDB();
    const result = await db.collection("games").updateOne({ "_id": ObjectID(_id) }, {$set:{player2}})
    return result
}

async function move(board, score1)
{
    const db = await getDB();
    const result = await db.collection("games").updateOne({$set:{board} }, {$set:{score1}})
    return result
}

async function sendMail(email) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bvbandy1234@gmail.com',
            pass: 'Edenami1234'
        }
    });

    let mailOptions = {
        from: 'bvbandy1234@gmail.com',
        to: 'bvbandy1234@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'your code is 1234'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}