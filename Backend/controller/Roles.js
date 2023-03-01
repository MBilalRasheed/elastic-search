const client = require("../elasticConfig/index.js");

function searchRoles(req, res, next) {
    try {
        {
            console.log('searchRoles');
            console.log(req.body);
            client.search({
                body: req.body,
                index: 'roledefs'
            })
                .then((e) => {
                    console.log(e); res.json(e)
                })
                .catch((c) => {
                    console.log(c); res.json(c)
                });
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { searchRoles }


