const express = require("express");
const fs = require("fs")
const path = require("path");
const fileURLToPath = require('url');

const app = express();
const router = express.Router();
const pages = fs.readdirSync('./pages').filter(file => file.endsWith('.html'));

console.log(pages);
app.set("port", process.env.PORT || 3000);

pages.forEach((element) => {

    let link;
    element == "index.html" ? link = "" : link = element;

    router.get(`/${link}`, (request, response) => {
        response.sendFile(path.resolve(`./pages/${element}`))
    })
})

app.use(router)
app.use(express.static(path.resolve('./public')));

app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"))
})