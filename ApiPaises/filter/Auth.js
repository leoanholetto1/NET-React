import jwt from "jsonwebtoken";

export default (req, res, next) => {
    const authToken = req.headers['x-access-token'];
    if(authToken) {
        try {
            let decoded = jwt.verify(authToken, SECRET);
            if(decoded) {
                res.status(200);
                next();
            }
            else {
                res.json('Token inválido');
            }
        } catch (error) {
            res.json('Token inválido');
        }
    }
    else {
        res.json('Sem permissão');
    }
}