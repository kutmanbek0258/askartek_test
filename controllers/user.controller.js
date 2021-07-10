const db = require("../db");
const bcrypt = require("bcryptjs");
const got = require('got');

class UserController {

    async registerUser(req, res){
         const { name, email, password } = req.body;

         let user = await db.query("SELECT * from users WHERE email = $1", [email]);
         if(user.rows[0]){
             console.log(user.rows);
             res.send("User exist")
         }else {
             const hashPass = await bcrypt.hash(password, 12);

             const newUser = await db.query("INSERT INTO users(name, email, hash_password) values ($1, $2, $3) RETURNING *", [name, email, hashPass]);
             await res.json(newUser.rows[0])
         }

    }

    async loginUser(req, res){
        const { email, password } = req.body;

        let user = await db.query("SELECT * from users WHERE email = $1", [email]);

        if(!user.rows[0]){
            console.log("User not exist");
            await res.send("User not exist");
        }

        let User = user.rows[0];
        const isMatch = await bcrypt.compare(password, User.hash_password);
        if(!isMatch){
            console.log("Incorrect password");
            await res.send("Incorrect password")
        }

        req.session.isAuth = true;
        req.session.username = User.email;
        req.session.user_id = User.id;
        await res.json(User);
    }

    async loginUserFromService(req, res){
        const {email, password} = req.body;

        try {
            const request = await got.post("http://localhost:8081/api/login", {
                json: {
                    email: email,
                    password: password
                },
                 responseType: 'json'
            });
            console.log(request.headers["set-cookie"]);
            res.cookie(request.headers["set-cookie"]);
            res.json(request.body);
        }catch (error) {
            res.json(error.response);
        }
    }

}

module.exports = new UserController();