const spdy = require('spdy')
const https = require('https')

const agent = spdy.createAgent({
  host: 'localhost',
  rejectUnauthorized: false,
  port: 3000,

  // Optional SPDY options
  spdy: {
    plain: false,
    ssl: true,
    // **optional** send X_FORWARDED_FOR
    // 'x-forwarded-for': '127.0.0.1'
  }
})

https.get({
  path: '/pagamentos/pagamento',
  agent: agent
}, function(res) {
  console.log(res.statusCode)

  res.on('data', (body) => {
    console.log(body.toString('utf8'))
    console.log(JSON.parse(body))
  })
  agent.close()
}).end()