import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log(req.headers)
            throw new Error('Authorization header is missing');
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            console.log(`Token is missing`)
            throw new Error('Token is missing');
        }
        //console.log(req.headers)
        const decoded = jwt.verify(token, "I love coding");
        req.userData = decoded;

        //console.log(`Verified ${req.userData.email} with ID ${req.userData.userId} and role ${req.userData.role}`);
        next();
    } catch (error) {
        console.log(`Auth failed: ${error.message}`);
        return res.status(401).json({
            message: `Auth Failed since, ${error.message}`
        });
    }
};

export default checkAuth;
