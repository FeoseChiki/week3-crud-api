const logRequeat = (req, res, next) =>{
    const timeStamp = new Date(). toISOString()
    console.log(`${timeStamp}- ${req.method}- ${req.URL} from ${req.ip}`);
    next();
};

module.export = logRequest