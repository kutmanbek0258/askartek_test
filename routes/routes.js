const Router = require("express");
//const session = require("express-session");
//const sessionStore = require("connect-pg-simple")(session);
//const db = require("../db");

const router = new Router();

const userController = require('../controllers/user.controller');
const productController = require("../controllers/product.controller");
const authService = require("../services/auth.service");

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
router.post("/user/login", userController.loginUser);
router.post("/product/create", authService.isAuth, productController.createProduct);
router.get("/product/get", authService.isAuth, productController.getProduct);
router.get("/product/get_all", authService.isAuth, productController.getProducts);
router.post("/product/add_product_favorite", productController.addProductFavorite);
router.get("/product/get_favorite_products", productController.getFavoriteProducts);
router.delete("/product/delete", authService.isAuth, productController.deleteProduct);

module.exports = router;