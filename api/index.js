const fs = require('fs')
const https = require('https')
const server = require('./src/app.js')
const { conn } = require('./src/db.js')

const key = fs.readFileSync(__dirname + '/private.key')
const cert = fs.readFileSync(__dirname + '/certificate.crt')

const credentials = {
  key,
  cert
}

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001')
  })
})
const httpsServer = https.createServer(credentials, server)
httpsServer.listen(8443)