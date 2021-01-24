const express = require("express")
const Lessons = require('./models/db-helpers')
const server = express()
server.use(express.json())

const port = 5000

server.get("/", (req, res) => {
    res.json({
        message: "Whats poppin'? Brand new whip just hop in!"
    })
})

server.post("/lessons", (req, res) => {
    Lessons.add(req.body)
        .then(lesson => {
            res.status(200).json({ message: `${req.body.name} was added` })
        })
        .catch(err => {
            res.status(404).json({ message: "could not add lesson" })
        })
})

server.get("/lessons", (req, res) => {
    Lessons.find()
        .then(lesson => {
            res.status(200).json(lesson)
        })
        .catch(err => {
            res.status(500).json({ message: "Can not retrieve lessons" })
        })
})

server.get("/lessons/:id", (req, res) => {
    Lessons.findById(req.params.id)
        .then(lesson => {
            if (lesson) {
                res.status(200).json(lesson)
            } else {
                res.status(404).json({ message: "No record of this ID" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Can not find this ID" })
        })
})

server.delete("/lessons/:id", (req, res) => {
    Lessons.remove(req.params.id)
        .then(lesson => {
            res.status(200).json({ message: `lesson ${req.params.id} was deleted` })
        })
        .catch(err => {
            res.status(500).json({ message: "Delete failed" })
        })
})

server.patch("/lessons/:id", (req, res) => {
    Lessons.update(req.params.id, req.body)
    .then(lesson => {
        if(lesson){
            res.status(200).json({message: `updated lesson ${req.params.id} to ${req.body.name}`})
        } else {
            res.status(404).json({message:"no record found"})
        }
    })
    .catch(err =>{
        res.status(500).json({message:"failed to update"})
    })
})

server.listen(port, (req, res) => {
    console.log(`*** live on port: ${port} ***`)
})