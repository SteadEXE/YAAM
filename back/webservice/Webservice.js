const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const Config = require('../Config')

const Router = require('./routes/Router')

class Webservice {
    init () {
        this.app = express()

        this.app.use('/', (req, res, next) => {
            const auth = req.get("authorization");

            if (!auth) {
                res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
                // If the user cancels the dialog, or enters the password wrong too many times,
                // show the Access Restricted error message.
                return res.status(401).send("Authorization Required");
            } else {
                let credentials = Buffer.from(auth.split(" ").pop(), "base64").toString("ascii").split(":");

                if (credentials[0] === Config.get('configuration.username').value() && credentials[1] === Config.get('configuration.password').value()) {
                    next()
                } else {
                    // The user typed in the username or password wrong.
                    return res.status(401).send("Access Denied (incorrect credentials)");
                }
            }
        })

        this.app.use('/', express.static(path.join(__dirname, '../../ui/dist')))

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))

        this.app.use(Router)

        this.app.listen(3000)
    }
}

module.exports = new Webservice()