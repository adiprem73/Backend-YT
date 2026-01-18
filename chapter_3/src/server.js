import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
//Get the directory name form the file path
const __dirname = dirname(__filename);

// middleware line: for post and put endpoints
app.use(express.json())
// serves the html file form the /public directory
//tells express t p serve all files fropm the publicfolder as static assets /file. any reqysts for the css files will be resolved to the pulic directory.

app.use(express.static(path.join(__dirname, '../public')))

//serving up the HTML file from the / public directory
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, ()=> {
    console.log(`Server has started on port : ${PORT}`)
})

