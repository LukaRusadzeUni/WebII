import express from "express";
import fs from "fs"
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const router = express.Router();
const pages = fs.readdirSync('./pages').filter(file => file.endsWith('.html'));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(pages);
app.set("port", process.env.PORT || 80);

pages.forEach((element) => {

    let link;
    element == "index.html" ? link = "" : link = element;

    router.get(`/${link}`, (request, resposne) => {
        resposne.sendFile(path.resolve(__dirname, `./pages/${element}`))
    })
})

app.use(router)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get("port"), () => {
    console.log("Server started on port " + app.get("port"))
})