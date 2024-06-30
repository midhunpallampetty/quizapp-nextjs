import React,{useEffect, useState} from "react";
import questions from "@/data/QuestionList";
const Quiz: React.FC= ()=>{
  const [questions,setQuestions]=useState<any>([])
const [answers,setAnswers]=useState<string[]>(Array(questions.length).fill(''));
const [submitted,setSubmitted]=useState(false)
const [score,setScore]=useState(0);
const [currentQuestion,setCurrentQuestion]=useState(0)
useEffect(()=>{
const storedQuestions=localStorage.getItem('questions')
if(storedQuestions){
  const parsedQuestions=JSON.parse(storedQuestions);
  console.log(parsedQuestions)
  setQuestions(parsedQuestions)
  setAnswers(Array(parsedQuestions.length).fill(''))
}
},[])
const handleAnswerChange=(answer:string)=>{
const newAnswers=[...answers];
newAnswers[currentQuestion]=answer;
setAnswers(newAnswers)
}
const handleSubmit=()=>{
    let newScore=0;
    answers.forEach((answer,index)=>{
     if(answer===questions[index].correctAnswer){
        newScore++;
     }
    });
    setScore(newScore);
    setSubmitted(true);
};
const handleNextQuestion=()=>{
if(currentQuestion<questions.length-1){
    setCurrentQuestion(currentQuestion+1)
}
}
const resetQuiz=()=>{
  setAnswers(Array(questions.length).fill(''))
  setSubmitted(false)
  setScore(0)
  setCurrentQuestion(0)
}
if (questions.length === 0) return <div>Loading...</div>;
return (
    <div className="text-white mt-14 ml-14">
    {!submitted ? (
      <div>
        <h1 className="text-5xl font-bold mb-4">Quiz</h1>
        <div className="mb-6">
          <h2 className=" font-semibold mb-2 text-4xl">{questions[currentQuestion].question}</h2>
          {questions[currentQuestion].options.map((option:string) => (
            <label key={option} className="block mb-2 font-mono font-extrabold text-3xl bg-transparent border-2 mt-4 p-4">
            <input
  type="radio"
  name={`question-${currentQuestion}`}
  value={option}
  checked={answers[currentQuestion] === option}
  onChange={() => handleAnswerChange(option)}
  className="relative mr-4 h-5 w-5 cursor-pointer appearance-none rounded-full border border-pink-900 text-green-900 transition-all
             checked:border-green-800 checked:bg-green-500 hover:bg-red-300"
  />

              {option}
            </label>
          ))}
        </div>
        {currentQuestion < questions.length - 1 ? (
          <button onClick={handleNextQuestion} className="bg-blue-500 w-[250px] ml-[600px] h-[50px] text-3xl pb-4 text-white px-4 py-2 rounded-lg font-bold mr-4">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="  bg-green-500  border-none w-[250px] h-[50px] ml-[550px] text-white px-4 py-2 rounded-lg font-bold mr-4">
            Submit
          </button>
        )}
      </div>
    ) : (
      <div>
        <h1 className="text-8xl ml-[250px] font-bold mb-4">Results</h1>
        <div className="ml-[250px] text-5xl font-serif text-green-500 font-extrabold"> Your score: {score} / {questions.length}</div>
        <button onClick={resetQuiz} className="bg-blue-500 w-[150px] h-[50px] font-bold  ml-[250px] text-white px-4 py-2 rounded-lg font-bold mt-4">
          Retake Quiz
        </button>
      </div>
    )}
  </div>
  );
};
export default Quiz;