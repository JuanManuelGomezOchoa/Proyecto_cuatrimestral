import { Schema } from "mongoose";
export interface IUser{
    name: string;
    email: string;
    lastNames: string;
    password: string;
    rol: "administrator" | "client";
}
export interface IQuestion{
    title: string
    type: "radio" | "checkbox" | "select" | "text",
    isMandatory: boolean,
    questionnaireId: Schema.Types.ObjectId | string; 
}
export interface IQuestionnaire{
    title: string;
    description: string;
    userId: Schema.Types.ObjectId | string;
}
export interface IOption{
    title: string;
    questionId: Schema.Types.ObjectId | string;
}
export interface IAnswer{
    questionnaireId: Schema.Types.ObjectId | string;
    questionId: Schema.Types.ObjectId | string;
    answer: string;
}