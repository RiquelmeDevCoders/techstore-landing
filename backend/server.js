const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', express.static(path.join(__dirname)))

const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth Premium",
        descricao: "Fone de ouvido sem fio com qualidade de som excelente",
        preco: 199.90,
        imagem: "https://grupomateus.vtexassets.com/arquivos/ids/4277626-1200-1200?v=638894764984400000&width=1200&height=1200&aspect=true"
    },
    {
        id: 2,
        nome: "Smartwatch Inteligente",
        descricao: "Relógio inteligente com monitor de saúde e notificações",
        preco: 349.90,
        imagem: "https://cdn.mos.cms.futurecdn.net/FkGweMeB7hdPgaSFQdgsfj-970-80.jpg.webp"
    },
    {
        id: 3,
        nome: "Câmera Profissional HD",
        descricao: "Câmera Sony profissional com resolução Full HD e zoom digital",
        preco: 4999.90,
        imagem: "https://pro.sony/s3/2025/01/12102234/1000x700.png"
    }
]

app.get('/api/produtos', (req, res) => res.json(produtos))

app.post('/api/inscricao', async (req, res) => {
    const { email_inscrito } = req.body
    if (!email_inscrito || !email_inscrito.includes('@')) {
        return res.status(400).json({ message: 'E-mail inválido' })
    }
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'techstore'
        })
        await conn.execute('INSERT INTO inscritos (email_inscrito) VALUES (?)', [email_inscrito])
        await conn.end()
        res.status(201).json({ message: 'Inscrição realizada com sucesso' })
    } catch {
        res.status(500).json({ message: 'Erro ao salvar no banco' })
    }
})

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))