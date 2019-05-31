const https = require('https')

let pay = JSON.stringify({
  forma_de_pagamento: 'payfast',
  valor: 10.87,
  moeda: 'BRL',
  descricao: 'descrição do pagamento'
})


let options = {
  host: 'localhost',
  port: 3000,
  path: '/pagamentos/pagamento',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    'Accept': 'application/json',
    'Content-type' :'application/json'
  }
}

let request = https.request(options, function(res) {
  console.log(res.statusCode)

  res.on('data', (body) => {
    console.log(JSON.parse(body))
  })
  agent.close()
})

request.write(pay, (err, res ) => console.log('Write', err, res))
request.end()