import { Request, Response } from "express";
import { AnswerModel } from "../models/AnswersModel"; 
import jwt from "jsonwebtoken"

export const registerAnswers = async (req:Request, res:Response):Promise<any> =>{
    try {
        const questionnaireId = req.body.questionnaireId
        const questionId = req.body.questionId
        const answer = req.body.answer


        if(!questionnaireId|| !questionId || !answer){
            return res.status(400).json({
                msg:"Faltan datos para crear la respuesta"
            })
        }

        const Answer = await AnswerModel.create({
            questionnaireId,
            questionId,
            answer      
        })

        const token = jwt.sign(JSON.stringify(Answer), "shhh");

        return res.status(200).json({msg:"Respuesta registrada con exito", token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Hubo un error al crear la respuesta"})
    }
}


