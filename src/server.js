require('dotenv').config()
const app = require('./app')
const connectDb = require('./mongodb')
const {appConfig, dbConfig} = require('./config')

async function init (appConfig,dbConfig){
    try{
        await connectDb(dbConfig)
        app.listen(appConfig.port,()=>{
            console.log(`server running at ${appConfig.host}:${appConfig.port}`)
        })
    }catch(e){
        console.error(e)
        process.exit(0)
    }
}

init(appConfig,dbConfig)