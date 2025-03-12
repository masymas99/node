
const http = require("http")


let users = [
    { id: 1, name: "sam", age: 54 },
    { id: 2, name: "sally", age: 12 },
    { id: 3, name: "carol", age: 61 },
]

const server = http.createServer((req, res) => {
 
 if(req.url == "/users" && req.method == "GET"){
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify(users))
 }else if(req.url == "/users" && req.method == "POST"){
    req.on("data", function(chunk){
        userId = JSON.parse(chunk)
        let isFounded = users.find(user => user.id == userId.id)
        if(isFounded){
            res.statusCode = 409
            res.end("Already Exsist")
        }else{
            users.push(JSON.parse(chunk))
            res.end("created")
        }
    })
 }else if(req.url == "/users" && req.method == "DELETE"){
    req.on("data", function(chunk) {
        user = JSON.parse(chunk)
        users = users.filter(element => element.id != user.id)
        res.end("Deleted")
    })
 }else if(req.url == "/users" && req.method == "PUT"){
    req.on("data", function(chunk) {
        user = JSON.parse(chunk)
        let foundedUser = users.find(ele => ele.id == user.id)
        if(foundedUser){
            foundedUser.name = user.name 
            foundedUser.age = user.age 
            res.end("Updated")
        }
    })
 }else if(req.url == "/user" && req.method == "POST"){
     req.on("data", function(chunk) {
         const requestData = JSON.parse(chunk)
         const foundUser = users.find(user => user.id == requestData.id)
         if(foundUser){
             res.setHeader("content-type", "application/json")
             res.end(JSON.stringify(foundUser))
         }else{
             res.statusCode = 404
             res.end("User not found")
         }
     })
 }else if(req.url == "/users/search" && req.method == "POST"){
     req.on("data", function(chunk) {
         const requestData = JSON.parse(chunk)
         const matchingUsers = users.filter(user => 
             user.name.toLowerCase().includes(requestData.name.toLowerCase())
         )
         res.setHeader("content-type", "application/json")
         res.end(JSON.stringify(matchingUsers))
     })
 }
})


server.listen(3000, function(err){
    if(err){
        console.log(err)
    }
    console.log("server is running on port 3000")
})