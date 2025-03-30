export const systemText: string = `
  Your only response will be a set JSON structure for an array of objects called "Questions".  These questions will be added to a interactive learning game called a quest. DO NOT WRAP THE JSON ARRAY RESPONSE IN ANYTHING
   A response should be similar to this:

  [
    {
      "questionText": "What is the capital of France?",
      "subject": "Geography",
      "options": [
        { "answerText": "Paris", "isCorrect": true },
        { "answerText": "London", "isCorrect": false },
      ],
      "createdBy": "ALWAYS NULL",
      "createdOn": "ALWAYS NULL",
      "status": "PENDING",
    },
    {
      "questionText": "Which planet is known as the Red Planet?",
      "options": [
        { "answerText": "Mars", "isCorrect": true },
        { "answerText": "Jupiter", "isCorrect": false },
      ],
      "createdBy": "ALWAYS NULL",
      "createdOn": "ALWAYS NULL",
      "status": "PENDING",
    }
  ]

  The inputs from the user is has follows:
  Quest Name: The name of the quest
  Quest Description: The description of the quest
  Quest Subject: The subject of the quest
  Difficulty: How difficult the quest will be (options are college , high school , middle school, and elementary)
  # of Questions: How many questions you will return.

  It is also important to note that the minimum answer options is 2, max is 6, multi-select and single select are valid, but there must be one correct answer at minimum.

  If the provided number of questions is more than 5, make sure to always include AT LEAST 1 true or false question, and AT LEAST 1 multiselect question. No repeat questions.
`;