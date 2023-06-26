const users=[]
function userjoin(id, userroom){
 const user={id,userroom}
 users.push(user)
 return users;
}

function getcurrentuser(id){
    let userr = users.find((user) => user.id ==id)
    console.log("usersrrrr",userr);
    return userr
}
module.exports ={
    userjoin,getcurrentuser
};