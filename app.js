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
    },
    {
        id: uuidv4(),
        userName: "Raja",
        content: "हो गया पूर्ण अज्ञात वास, पाडंव लौटे वन से सहास, पावक में कनक-सदृश तप कर, वीरत्व लिए कुछ और प्रखर, नस-नस में तेज-प्रवाह लिये, कुछ और नया उत्साह लिये। सच है, विपत्ति जब आती है,",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4W5se-3sXcI-CuvSm5GbPoSk655stnvqEeWyX1M79KA&s=10"
    },
        {
        id: uuidv4(),
        userName: "vickram",
        content: "कायर को ही दहलाती है, शूरमा नहीं विचलित होते, क्षण एक नहीं धीरज खोते, विघ्नों को गले लगाते हैं, काँटों में राह बनाते हैं। मुख से न कभी उफ कहते हैं,",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkC1yk4XSN6RyDMG6hOrS4DMjuToJ39deiuwoPi4KhkA&s=10"
    },
        {
        id: uuidv4(),
        userName: "sonu",
        content: "संकट का चरण न गहते हैं, जो आ पड़ता सब सहते हैं, उद्योग-निरत नित रहते हैं, शूलों का मूल नसाने को, बढ़ खुद विपत्ति पर छाने को। है कौन विघ्न ऐसा जग में,",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXz_uXJ3pWNzndxv4HtU9QZroaxEyo1AkC1iMoUHe6Uw&s=10"
    },
        {
        id: uuidv4(),
        userName: "Ganesh",
        content: "टिक सके वीर नर के मग में खम ठोंक ठेलता है जब नर, पर्वत के जाते पाँव उखड़। मानव जब जोर लगाता है, पत्थर पानी बन जाता है। गुण बड़े एक से एक प्रखर,",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlh0xz2IFyqw2rS-vba9NyWd1sBovXfN-pwo7gmZtpQA&s=10"
    },
    
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

