import { Schema, model } from "mongoose";

interface IOption{
    title: string;
    questionId: Schema.Types.ObjectId | string;
}

const OptionSchema = new Schema<IOption>({
        title:{
            type: String,
            required:true
        },
        questionId:{
            type: Schema.Types.ObjectId,
            ref:"options",
            required:true
        }

        
})

export const OptionsModel = model("options", OptionSchema);