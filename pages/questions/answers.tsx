import React from 'react'
import { useEffect,useState } from 'react'
import Navbar from '@/components/Navbar';
interface Question {
  id:number;
  question:string;
  options:string[];
  correctAnswer:string;
}
const QuestionsList : React.FC=()=>{
const [questions,setQuestions]=useState<Question[]>([])
useEffect(()=>{
const storedQuestions=localStorage.getItem('questions')
if(storedQuestions){
  setQuestions(JSON.parse(storedQuestions))
}
},[]);
return (
  <>
      <Navbar/>
      <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-4 mt-20">All Questionsn With Answers</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-6 p-4 border rounded-lg mt-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">{q.question}</h2>
          <ul className="list-disc pl-6">
            {q.options.map((option, index) => (
               <li
               key={index}
               className={option === q.correctAnswer ? 'font-extrabold text-green-500 text-2xl' : 'text-white text-2xl font-extrabold'}
             >
               {option}
             </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </>
 
);
};

export default QuestionsList;
