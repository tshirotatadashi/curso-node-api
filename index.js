const port = 3000
const fs = require('fs')
const spdy = require('spdy')
const app = require('./config/custom-express')()
const options = {key: fs.readFileSync('./config/localhost-privkey.pem'), cert: fs.readFileSync('./config/localhost-cert.pem')}

const server = spdy.createServer(options, app)

server.listen(port, () => {
  console.log('Listening on port: ' + port + '.')
})