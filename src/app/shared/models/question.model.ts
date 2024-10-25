export interface SubmittedQuestion {
    questionText: string,
    options: Answer[],
    status: string,
}

export interface Answer {
    answerText: string,
    isCorrect: boolean
}