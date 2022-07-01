const axios = require('axios')



exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            res.render('index', { users: response.data })

        })
        .catch(err => {
            res.send(err)
        })

}

exports.addUserRoutes = (req, res) => {
    res.render('add_user');
}

exports.updateUserRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {
            res.send(err)
        })
}