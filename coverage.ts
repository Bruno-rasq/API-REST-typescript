import express from "express"
import path from "path"

const app = express()
const port = 3000

// servi arquivos estaticos da raiz do projeto
app.use(express.static(path.join(__dirname)))

// serve p arquivo index.html no endpoint "/"
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "./coverage/lcov-report/index.html"))
})

app.listen(port, () => {
        console.log(`server is running on port ${port}`)
})