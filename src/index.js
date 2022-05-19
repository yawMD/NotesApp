const express = require('express')
require('./db/mongoose')
const taskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//         // res.status(505).send("site under maintenance")
//     next()
// })


app.use(express.json())
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})