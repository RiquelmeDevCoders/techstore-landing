const grid = document.getElementById('produtos')
const form = document.getElementById('form')
const msg = document.getElementById('msg')

function moeda(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregar() {
    const res = await fetch('/api/produtos')
    const produtos = await res.json()
    grid.innerHTML = produtos.map(p => `
    <div class="card">
    <img src="${p.imagem}">
    <h4>${p.nome}</h4>
    <p>${p.descricao}</p>
    <div class="preco">${moeda(p.preco)}</div>
    </div>
`).join('')
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const email = document.getElementById('email').value.trim()
    msg.textContent = ''
    if (!email || !email.includes('@')) {
        msg.textContent = 'Digite um e-mail válido'
        msg.style.color = 'salmon'
        return
    }
    const res = await fetch('/api/inscricao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_inscrito: email })
    })
    const data = await res.json()
    msg.textContent = data.message
    msg.style.color = res.ok ? 'lightgreen' : 'salmon'
    form.reset()
})

carregar()