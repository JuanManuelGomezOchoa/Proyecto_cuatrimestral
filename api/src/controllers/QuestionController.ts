import { Request, Response } from "express";
import { QuestionModel } from "../models/QuestionsModel";
import jwt from "jsonwebtoken"

export const registerQuestion = async (req:Request, res:Response):Promise<any> =>{
    try {
        const title = req.body.title
        const type = req.body.type
        const isMandatory = req.body.isMandatory
        const questionnaireId = req.body.questionnaireId


        if(!title|| !type || !isMandatory || questionnaireId){
            return res.status(400).json({
                msg:"Faltan datos para crear la pregunta"
            })
        }

        const question = await QuestionModel.create({
            title,
            type,
            isMandatory,
            questionnaireId      
        })

        const token = jwt.sign(JSON.stringify(question), "shhh");

        return res.status(200).json({msg:"Pregunta registrada con exito", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Hubo un error al crear la pregunta"})
    }
}


