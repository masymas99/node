const fs = require('fs');
const userstring = fs.readFileSync('./data.json', 'utf-8');
const user = JSON.parse(userstring);
console.log(user); 
const [,,action, id , name , age] = process.argv;


const adduser = () => {
    let newid = 0;
    if (user.length > 0){
        newid = user[user.length - 1].id + 1;
    }
    const newuser = {
        id: newid,
        name: name,
        age: parseInt(age)
    };
    user.push(newuser);
    fs.writeFileSync('./data.json', JSON.stringify(user));
};

const deluser = () => {
    user.splice(id, 1);
    fs.writeFileSync('./data.json', JSON.stringify(user));
};

const updateuser = () => {
    user[id] = {
        id: parseInt(id),
        name: name,
        age: parseInt(age)
    };
    fs.writeFileSync('./data.json', JSON.stringify(user));
};

switch(action){
    case 'add':
        adduser();
        break;
    case 'delete':
        deluser();
        break;
    case 'update':
        updateuser();
        break;
    case 'list':
        console.log(user);
        break;
    default:
        console.log('Invalid action');
        break;
}

