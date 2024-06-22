import { UserService } from "../services/users-service.js";
import { doJwtAuth } from "./doJwtAuth.js"

export async function requireAdmin(req, res, next) {

    const checkAdmin = async () => {

        const _invalidAuth = (message) =>
            res.status(401).json({ message: message || "Not allowed" });

        if (!req.headers.authorization) return _invalidAuth();
        if (!req.authenticatedUserId) return _invalidAuth();


        try {
            if (!(await UserService.checkForAdmin(req.authenticatedUserId))) return _invalidAuth();
            next();
        } catch (err) {
            console.log(err);
            return _invalidAuth();
        }
    };

    await doJwtAuth(req, res, checkAdmin);
}