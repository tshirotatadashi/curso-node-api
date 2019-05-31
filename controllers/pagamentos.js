
module.exports = function(app){
  app.get('/pagamentos/pagamento', function(req, res){
    res.status(200).json({status: "ok"})
  })

  app.post('/pagamentos/pagamento', function(req, res){
    let pagamento = req.body

    req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty()
    req.assert("valor", "Valor é obrigatório e deve ser um decimal.").notEmpty().isFloat()
    req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3)

    const errors = req.validationErrors()

    if (errors){
      console.log("Erros de validação encontrados")
      res.status(400).send(errors)
      return
    }
    console.log('processando pagamento...')

    const connection = app.persistencia.connectionFactory()
    const pagamentoDao = new app.persistencia.PagamentoDao(connection)

    pagamento.status = "CRIADO"
    pagamento.data = new Date

    pagamentoDao.salva(pagamento, function(err, result){
      if (err) {
        console.log('Erro ao inserir no banco')
        res.status(500).send(err)
      } else {
        console.log('pagamento criado: ' + result)
        res.location('/pagamentos/pagamento/' + result.insertId)
        pagamento.id = result.insertId
        res.status(201).json(pagamento)
      }
    })
  })
}