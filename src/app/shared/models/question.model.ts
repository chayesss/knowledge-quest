export interface SubmittedQuestion {
    questionText: string,
    subject?: string,
    options: Answer[],
    status: string,
    createdBy?: string,
    createdOn?: Date
}

export interface Answer {
    answerText: string,
    isCorrect: boolean
}