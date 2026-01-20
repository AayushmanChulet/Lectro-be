import dotenv from "dotenv";
dotenv.config();
import express, {Request, Response} from "express"
import v1 from "./routes/v1/index"
import cors from "cors"
import axios from 'axios';


axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/", v1)

app.listen(3000, () => {
    console.log('server is live at port 3000');
})