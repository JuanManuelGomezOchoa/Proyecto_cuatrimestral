import { Request, Response } from "express";
import { QuestionnairesModel } from "../models/QuestionnairesModel"; 
import { QuestionModel } from "../models/QuestionsModel";
import { OptionsModel } from "../models/OptionsModel"; 

export const registerQuestionnaires = async (req: Request, res: Response): Promise<any> => {
    try {
        const title = req.body.title
        const description = req.body.description
        const userId = req.body.userId
        const questions = req.body.questions

      if (!title || !description || !userId) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
      }
  

      const questionnaire = await QuestionnairesModel.create({
        title,
        description,
        userId,
      });
  
      const preguntas = await Promise.all(questions.map(async (question: any) => {
          const pregunta = await QuestionModel.create({
            title: question.title,
            type: question.type,
            isMandatory: question.isMandatory,
            questionnaireId: questionnaire.id, 
          });
  

          if (question.options && question.options.length > 0) {
            await Promise.all(question.options.map(async (option: any) => {
                await OptionsModel.create({
                  title: option.title,
                  questionId: pregunta.id, 
                });
              })
            );
          }
  
          return pregunta;
        })
      );
  
      return res.status(200).json({
        msg: "Cuestionario creado con éxito",
        cuestionario: questionnaire,
        preguntas,
    }
);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Hubo un error al crear el cuestionario"}

      );
}
};