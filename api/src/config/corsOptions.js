const allowedOrigins = [
    'https://foodapp2022.herokuapp.com',
    'https://recipe-react-webpage-pi.vercel.app',
    'http://127.0.0.1:5500/',
    'http://localhost:3001',
    'http://localhost:3000',
  ]

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

// const credentials = (req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.header('Access-Control-Allow-Origin', origin)
//         res.header('Access-Control-Allow-Credentials', true)
//         res.header('Access-Control-Allow-Headers', 'Origin, X-Auth-Token, Content-Type, Authorization')
//         res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//     }
//     next();
// }

module.exports = {corsOptions};