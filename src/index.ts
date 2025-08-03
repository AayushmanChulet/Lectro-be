import Express, {Request, Response} from "express"

const app = Express();

app.get("/", (req : Request, res : Response) => {
  res.status(200).json({});
})

app.listen(3000, () => {
    console.log('server is live at port 3000');
})