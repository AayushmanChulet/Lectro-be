import Express, {Request, Response} from "express"
import v1 from "./routes/v1/index"

const app = Express();

app.use("/api/v1/", v1);

app.listen(3000, () => {
    console.log('server is live at port 3000');
})