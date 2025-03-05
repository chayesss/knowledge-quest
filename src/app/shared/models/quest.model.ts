import { SubmittedQuestion } from "./question.model";
import { Team } from "./team.model";

export interface Quest {
    id?: string;
    questName: string,
    questDescription: string,
    questSubject: string,
    createdBy: string,
    createdOn: Date,
    questions: SubmittedQuestion[]
}

export interface CompletedQuest {
    id?: string,
    questId: string,
    teams: Team[],
    completedOn?: Date,
}