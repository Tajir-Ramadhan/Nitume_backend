export const cors = (req, res, next) => {
    const allowedOrigins = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost','http://localhost:8082'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
       // console.log(`CORS policy applied configured origin for: ${req.headers.origin}`)

    } else {
        res.header('Access-Control-Allow-Origin', '*'); // Consider removing this for stricter control
        console.log(`CORS policy applied for falback: ${req.headers.origin}`)
    }
    
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 
            'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    
    next();
};

export default cors