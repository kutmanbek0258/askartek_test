const Router = require("express");
const session = require("express-session");
const sessionStore = require("connect-pg-simple")(session);
const db = require("../db");

const router = new Router();

const userController = require('../controllers/user.controller');
const productController = require("../controllers/product.controller");
const isAuth = require("../services/isAuth");

/*router.use(session({
    store : new sessionStore({
        pool : db,
        tableName : "session"
    }),
    secret : "superSecretKey",
    resave : false,
    saveUninitialized : false,
    cookie: { maxAge: 60 * 60 * 1000 } // 10 min
}));*/

router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUserFromService);
//router.post("/product/create", isAuth, productController.createProduct);
//router.get("/product/get", isAuth, productController.getProduct);
//router.get("/product/get_all", isAuth, productController.getProducts);
//router.post("/product/add_product_favorite", isAuth, productController.addProductFavorite);
//router.get("/product/get_favorite_products", isAuth, productController.getFavoriteProducts);
//router.delete("/product/delete", isAuth, productController.deleteProduct);

module.exports = router;