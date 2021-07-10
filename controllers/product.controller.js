const db = require("../db");
const auth = require("../services/auth.service");

class ProductController {

    async getProduct(req, res){
        const { id } = req.body;

        let product = await db.query("SELECT * FROM product WHERE id = $1", [id]);

        if(product.rows[0]){
            await res.json(product.rows[0])
        }else {
            await res.send("products not found");
        }
    }

    async getProducts(req, res){
        const { category_id } = req.body;

        if(category_id){
            let products = await db.query("SELECT * FROM product WHERE category_id = $1", [category_id]);

            if(products.rows[0]){
                await res.json(products.rows)
            }else {
                await res.send("products not found");
            }
        }else {
            let products = await db.query("SELECT * FROM product");

            if(products.rows[0]){
                await res.json(products.rows)
            }else {
                await res.send("products not found");
            }
        }
    }

    async createProduct(req, res){
        const { name, category_id } = req.body;

        let product = await db.query("INSERT INTO product(name, category_id) values ($1, $2) RETURNING *", [name, category_id]);

        if(product.rows[0]){
            await res.json(product.rows[0])
        }else {
            await res.send("Product creating error")
        }
    }

    async addProductFavorite(req, res){
        const {authorized, user_id} = await auth.isAuthV2(req);

        if(authorized){
            const {product_id} = req.body;

            let favorite_product = await db.query("INSERT INTO user_product_favorite(user_id, product_id) values ($1, $2) RETURNING *", [user_id, product_id]);

            if(favorite_product.rows[0]){
                await res.json(favorite_product.rows[0])
            }else {
                await res.send("Favorite creating error")
            }
        }else {
            res.send("not authorized")
        }
    }

    async getFavoriteProducts(req, res){
        const {authorized, user_id} = await auth.isAuthV2(req);

        if(authorized){
            let favorites = await db.query("SELECT user_product_favorite.id, product.id AS product_id, product.name\n" +
                "FROM user_product_favorite\n" +
                "INNER JOIN product ON user_product_favorite.product_id=product.id\n" +
                "WHERE user_product_favorite.user_id = $1", [user_id]);

            if(favorites.rows[0]){
                let products = new Object();
                products.products = favorites.rows;
                products.counter = favorites.rows.length;
                await res.json(products)
            }else {
                await res.send("products not found");
            }
        }else {
            res.send("not authorized")
        }
    }

    async deleteProduct(req, res){
        const { id } = req.body;

        let favorites = await db.query("SELECT * FROM user_product_favorite WHERE product_id = $1", [id]);

        for(let i=0; i<favorites.rows.length; i++){
            await db.query("DELETE FROM user_product_favorite WHERE id = $1", [favorites.rows[i].id]);
        }

        let product = await db.query("DELETE FROM product WHERE id = $1", [id]);

        await res.json(product.rows[0])
    }

}

module.exports = new ProductController();