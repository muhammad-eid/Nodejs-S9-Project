require('dotenv').config()
const app = require('./app/src')

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`start app on PORT ${PORT}, Link>> http://localhost:${PORT}`);
})

