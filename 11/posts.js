const http = require("http")

let posts = [
    { id: 1, title: "First Post", desc: "This is the first post" },
    { id: 2, title: "Second Post", desc: "This is the second post" },
    { id: 3, title: "Third Post", desc: "This is the third post" },
]

const server = http.createServer((req, res) => {
    if(req.url == "/posts" && req.method == "GET"){
        res.setHeader("content-type", "application/json")
        res.end(JSON.stringify(posts))
    }else if(req.url == "/posts" && req.method == "POST"){
        req.on("data", function(chunk){
            const postData = JSON.parse(chunk)
            let isFounded = posts.find(post => post.id == postData.id)
            if(isFounded){
                res.statusCode = 409
                res.end("Post Already Exists")
            }else{
                posts.push(postData)
                res.end("Post Created")
            }
        })
    }else if(req.url == "/posts" && req.method == "DELETE"){
        req.on("data", function(chunk) {
            const postData = JSON.parse(chunk)
            posts = posts.filter(post => post.id != postData.id)
            res.end("Post Deleted")
        })
    }else if(req.url == "/posts" && req.method == "PUT"){
        req.on("data", function(chunk) {
            const postData = JSON.parse(chunk)
            let foundPost = posts.find(post => post.id == postData.id)
            if(foundPost){
                foundPost.title = postData.title
                foundPost.desc = postData.desc
                res.end("Post Updated")
            }else{
                res.statusCode = 404
                res.end("Post not found")
            }
        })
    }else if(req.url == "/post" && req.method == "POST"){
        req.on("data", function(chunk) {
            const requestData = JSON.parse(chunk)
            const foundPost = posts.find(post => post.id == requestData.id)
            if(foundPost){
                res.setHeader("content-type", "application/json")
                res.end(JSON.stringify(foundPost))
            }else{
                res.statusCode = 404
                res.end("Post not found")
            }
        })
    }else if(req.url == "/posts/search" && req.method == "POST"){
        req.on("data", function(chunk) {
            const requestData = JSON.parse(chunk)
            const matchingPosts = posts.filter(post => 
                post.title.toLowerCase().includes(requestData.title.toLowerCase())
            )
            res.setHeader("content-type", "application/json")
            res.end(JSON.stringify(matchingPosts))
        })
    }
})

server.listen(3001, function(err){
    if(err){
        console.log(err)
    }
    console.log("Posts server is running on port 3001")
})