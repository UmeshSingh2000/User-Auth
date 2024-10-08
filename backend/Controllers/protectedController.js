const homepage = (req,res)=>{
    res.json({ message: 'Welcome to the homepage, ' + req.user.username });
}
module.exports = {homepage}