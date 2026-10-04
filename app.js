const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));




app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));



// C:\Users\ADMIN\Desktop\Sigma 5.0\Backend\class 6 practice project using CRUD operations



let posts = [
    {
        id: uuidv4(),
        userName: "शशि भूषण",
        content: "श्रम काग़ज़ है। कर्म हस्ताक्षर। व्यक्ति को अपना काम करना चाहिए। मेहनत से। ईमानदारी से। समर्पण से। सजगता के साथ और अद्यतन कर्मठता से। लेकिन कर्म करने से पहले चुनाव करना ही चाहिए कि कौन-सा काम करने योग्य",
        image: "https://hindwi.org/images/ResorceImages/blog/71d27b2d-d9c2-40a8-be9d-d55a38771906_Card.jpg"
    },
    {
        id: uuidv4(),
        userName: "Rahul",
        content: "बे-दिली क्या यूँ ही दिन गुज़र जाएँगे, सिर्फ़ ज़िंदा रहे हम तो मर जाएँगे।",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIkOWUHS1I4RTsobQ3hs92iAW6sB8KP37rjF-bPKkD9Q&s=10"
    }
];


app.get("/", (req, res) => {
    res.send("Server Start");
});

app.get("/home", (req, res) => {
    res.render("home.ejs", { posts });
});

app.get("/home/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/home", (req, res) => {
    let { userName, image, content } = req.body;
    let id = uuidv4();
    console.log({ id, image, content, userName });
    posts.push({ id, image, content, userName });
    res.redirect("/home");
});

app.get("/home/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);// posts me se hamari di hui id ko find function dundega or use compare karega or yadi vo id match ho jati he jo id hamne di he to use post nam ke variable me store kar dega 
    res.render("show.ejs", { post });
});

app.patch("/home/:id", (req, res) => { // update route 
    let { id } = req.params; // id nikali he
    let { content } = req.body; // naya content liya he body se
    let post = posts.find((p) => id === p.id);
    post.content = content;
    console.log("content: ", content);
    console.log("id: ", id);
    res.redirect("/home");
});

app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id); // ham jo id send kar rhe he us ke alawa sari filter ho kar usi posts nam ke variable me store ho jaye 
    console.log("post: ", posts)
    console.log("id: ", id)
    res.redirect("/home");
});


app.listen(port, () => {
    console.log(`Server is listing on port ${port}`);
})

