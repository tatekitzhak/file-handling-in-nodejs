//Inserting into a database
let usersInfo = {
    first_name: "Ran",
    last_name: "Itzhak",
    user_type: "Software Engineer",
    username: "RanItzhak",
    email: "ran@gmail.com",
    password: "1234"
};
// let sqlQuery = "INSERT INTO users SET ?";
// db_connection.query(sqlQuery, usersInfo, (err, result) => {
//     if (err)
//         console.log(`INSERT error o ${err}`);;
//     console.log(result);
//     console.log("an office added...");
// });


function solution(A=[1, 2, 3]) {
    // write your code in JavaScript (Node.js 8.9.4)
    let b = A.sort();
    for(let i=0; i<b.length-1; i++){

        let v = b[i+1] - b[i];
        if(v>1){
            console.log(`Result:[${b.length-1 }] ${v} =>${b[i]+1}`);
        }else if(v==1 ){
            console.log(`Result: ${v} =>${i}`);
        }else{
            console.log(`Result:${1}`);
        } 
        
    }
    return;
}

module.exports = solution;