import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js"; // Import your routes
import http from "http"
import debug from 'debug';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

/* Import Middlewares */
import cors from './middleware/cors.js'


// Initialize express app
const app = express();
// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors)
app.use('/images', express.static(path.join(__dirname, 'images')));


// Setup storage and multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Set the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
    },
});

const upload = multer({ storage });




// Use the router
app.use(router);

// Upload endpoint
// Route to handle file upload
app.post('/api/upload', upload.single('image'), (req, res) => {
    console.log('req.body:', req.body); // Log request body
    console.log('req.file:', req.file); // Log request file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    res.status(200).send({
        message: 'File uploaded successfully!',
        file: req.file,
    });
});


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to restaurant api' });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err.message);
    console.log(err)
});

// Normalize a port into a number, string, or false.
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val; // named pipe
    }

    if (port >= 0) {
        return port; // port number
    }

    return false;
}

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Event listener for HTTP server "error" event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

