//Inserting into a database
let usersInfo = {
    first_name: "Ran",
    last_name: "Itzhak",
    user_type: "Software Engineer",
    username: "RanItzhak",
    email: "ran@gmail.com",
    password: "1234"
};
let sqlQuery = "INSERT INTO users SET ?";
db_connection.query(sqlQuery, usersInfo, (err, result) => {
    if (err)
        console.log(`INSERT error o ${err}`);;
    console.log(result);
    console.log("an office added...");
});