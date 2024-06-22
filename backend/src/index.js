import express from "express";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import { UsersRouter } from "./routes/user-router.js";
import { CategoriesRoutes } from "./routes/category-router.js";
import { ItemRouter } from "./routes/item-router.js";
import { CartRoutes } from "./routes/cart-routes.js";

//for frontend shit
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/categories", CategoriesRoutes);
app.use("/api/v1/items", ItemRouter);
app.use("/api/v1/cart", CartRoutes);

app.use('/api/v1/uploads', express.static('uploads'));

//Frontend shit

app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '../', 'frontend', 'index.html'));
    }
});

app.use(express.static('frontend'));

//

connectToDatabase()
    .then(() => {
        const PORT = process.env.PORT || 3006;
        app.listen(PORT, () => console.log("Server listening at port", PORT));
    })
    .catch((err) => {
        console.log(err);
        process.exit();
    });