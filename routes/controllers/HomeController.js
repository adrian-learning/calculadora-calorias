module.exports = {
    home: (req,res) => {
        res.send(`Home Page from id: ${req.params.id}`)
    }
}