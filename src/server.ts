import app from "./app"

const port = process.env.PORT || 3000;

// Inicia o servidor
app.listen(port, () => console.log(`Server running on port: ${port}`))