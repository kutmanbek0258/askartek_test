const got = require("got");

class AuthService{

    async isAuth(req, res, next){
        /*if(req.session.isAuth){
            next();
        }else {
            res.send("Not authorized")
        }*/

        try {
            const request = await got.post("http://localhost:8081/api/access", {
                json: {
                    sid: req.headers.sid
                },
                responseType: 'json'
            });
            console.log(request.body.user_id);
            if (request.body.authorized) {
                next();
            } else {
                res.send("Not authorized")
            }
        } catch (error) {
            res.send("Internal error")
        }
    };

    async isAuthV2(req){
        try {
            const request = await got.post("http://localhost:8081/api/access", {
                json: {
                    sid: req.headers.sid
                },
                responseType: 'json'
            });
            console.log(request.body.user_id);
            return request.body
        } catch (error) {
            return error
        }
    };

    async authenticate(req){
        const {email, password} = req.body;

        try {
            return await got.post("http://localhost:8081/api/login", {
                json: {
                    email: email,
                    password: password
                },
                responseType: 'json'
            })
        }catch (error) {
            return error
        }
    }
}

module.exports = new AuthService();