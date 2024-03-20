const express = require("express")
const path = require("path")
const fs = require("fs")

const PORT = process.env.PORT || 5000

const app = express()

app.get("/", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err){return(console.log(err))}

        data = data.replace(/__TITLE__/g, "Home Page".replace(/__DESCRIPTION__/g, "Home page description"));

        res.send(data)
    })
})

app.get("/articles", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err){return(console.log(err))}

        data = data.replace(/__TITLE__/g, "Articles".replace(/__DESCRIPTION__/g, "Article page description"));

        res.send(data)
    })
})

app.get("/movies", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err){return(console.log(err))}

        data = data.replace(/__TITLE__/g, "Movies".replace(/__DESCRIPTION__/g, "Movie page description"));

        res.send(data)
    })
})

app.get("/books", (req, res) => {
    const filePath = path.resolve(__dirname, "./build", "index.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err){return(console.log(err))}

        data = data.replace(/__TITLE__/g, "Books".replace(/__DESCRIPTION__/g, "Book page description"));

        res.send(data)
    })
})

app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, () => {
    console.log("Server live")
})