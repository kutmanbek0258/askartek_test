const isAuth = async (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else {
        res.send("Not authorized")
    }
    /*const got = require("got");

    try {
        const request = await got.post("http://localhost:8081/api/access");
        console.log(req.headers.cookie);
        //res.cookie(req.headers.cookie);
        if (request.body.authorized) {
            next();
        } else {
            res.send("Not authorized")
        }
    } catch (error) {
        res.send("Internal error")
    }*/
};

module.exports = isAuth;