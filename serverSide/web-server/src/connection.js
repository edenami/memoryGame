const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb+srv://eden:Eden1234@cluster0.f47ue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const databaseName = 'tommy'

async function getDB(){
    return await MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client)=>{
        if(error){
            console.log(error)
            return console.log('Unable to connect to database')
        }
        return client.db(databaseName)
    })
}

async function addUser(username, password){
    const db = await getDB();
    db.collection('users').insertOne({
        username, password
     })
}

export default addUser;