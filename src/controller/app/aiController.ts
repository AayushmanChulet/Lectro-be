import  transcribe  from "../../utils/transcribe"
import {Request , Response} from 'express'
import z from "zod";

export const getTransription = async ( req: Request, res : Response ) => {
    const data = await transcribe("https://www.youtube.com/watch?v=A4_2rxpN5ag");
    res.status(200).json({data})
}

const notesSchema = z.object({
    link : z.string(),
})

type notesType = z.infer<typeof notesSchema> ;

export const notesController = async (req : Request, res : Response) => {
    const {success} = notesSchema.safeParse(req.body);
    
    if(!success){
        return res.status(403).json({
            message : "Invalid input", 
            status : "rejected",
            data : {}
        })
    }


    const { link } : notesType = req.body;
    
    const transcription = await transcribe(link);

    const notes = await 
}
