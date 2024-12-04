import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singIn } from "./controllers/UserController";
import { createQuizz, getQuestionnaires } from "./controllers/QuestionnairesController"; 
import { registerAnswers } from "./controllers/AnswerController";
import { registerQuestion } from "./controllers/QuestionController";
import { getMetrics } from "./controllers/QuestionnairesController";

const app:Application = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true}));

app.get("/", (_req: Request, res: Response)=>{
    res.send("Hola desde mi servidor con TS")
})

//Usuarios
app.post("/users/create/", registerUsers)
app.post("/users/login/", singIn);
app.post("/questionnaires/create", createQuizz)
app.post("/answers/create", registerAnswers)
app.post("/questions/create", registerQuestion) 
app.get("/questionnaires/get-all", getQuestionnaires)

app.get("/questionnaire/get-metrics", getMetrics)
export default app;