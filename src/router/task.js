const express = require("express")
const task = require("../model/task");
const router = new express.Router()

router.post("/task", async(req, res)=>{
    // const Task = new task(req.body)
    const Task = new task(req.body)

    try{
        await Task.save()
        res.status(201).send(Task)
    }catch (e){
        res.status(404).send(e)
    }
    // Task.save().then(()=>{
    //     res.send(Task)
    // }).catch((error)=>{
    //     res.status(400)
    //     res.send(error)
    // })
})


router.get("/task",(req,res)=>{
            task.find({}).then((tasks)=> {
                res.send(tasks)
            }).catch((e)=>{
                        res.status(500).send(e)
            })

})

router.get("/task/:id",async (req, res)=>{
    const _id = req.params.id
    try {
        const Task = await task.findById(_id)
        if (!Task) {
            return res.status(404).send()
        }
        res.send(Task)
    }
    catch(error) {
        res.status(500).send(error)
    }
})


router.patch("/task/:id", async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ["task","completed"]
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const Task = await task.findByIdAndUpdate(req.params.id)

        updates.forEach((update)=>Task[update]=req.body[update])
        await Task.save()


        res.send(Task)
        res.status(201).send()
    }catch (e){
        res.status(400).send(e)
    }
})

router.delete("/task/:id", async(req,res)=>{
    const _id = req.params.id
    try{
        const Task = await task.findByIdAndDelete(_id)
        if(!Task){
            res.status(404).send()
        }
        res.send(Task)
    }catch(e){
        res.status(400).send()
    }

})

module.exports = router