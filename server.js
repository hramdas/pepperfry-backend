
const connect = require('./src/configs/db')
const app = require('./src/index')
const port =  process.env.PORT || 3001

app.listen(port, async ()=>{
    await connect()
    console.log("Listening on port 3001")
})

