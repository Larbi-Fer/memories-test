const jwt = require('jsonwebtoken')

// wase to like a post
// click the like button => auth middleware (next) => like controller ..

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData._id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub;
        }

        next()

    } catch (error) {
        console.log(error)
    }
}
module.exports = auth