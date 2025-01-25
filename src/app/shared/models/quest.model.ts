import { SubmittedQuestion } from "./question.model";

export interface quest {
    id?: string;
    questName: string,
    questDescription: string,
    questSubject: string,
    createdBy: string,
    createdOn: Date,
    questions: SubmittedQuestion[]
}