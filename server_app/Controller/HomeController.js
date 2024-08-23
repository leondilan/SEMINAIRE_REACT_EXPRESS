const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to Home Page"
    })
}

module.exports = {
    home
}