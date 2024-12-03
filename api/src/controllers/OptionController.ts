import { Request, Response } from "express";
import { OptionsModel } from "../models/OptionsModel";
import jwt from "jsonwebtoken"

export const registerOptions = async (req:Request, res:Response):Promise<any> =>{
    try {
        const title = req.body.title
        const questionId = req.body.questionId


        if(!title|| !questionId){
            return res.status(400).json({
                msg:"Faltan datos para crear la opcion"
            })
        }

        const options = await OptionsModel.create({
            title,
            questionId      
        })

        const token = jwt.sign(JSON.stringify(options), "shhh");

        return res.status(200).json({msg:"Opcion registrada con exito", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Hubo un error al crear la opcion"})
    }
}


