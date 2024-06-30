import React, { useState } from 'react'
import questions from '@/data/QuestionList'
import swal from 'sweetalert';
import Navbar from '@/components/Navbar';
const Add: React.FC=()=>{
  
  const [newQuestion, addNewQuestion] = useState('');
  const [newOptions, addNewOptions] = useState<string[]>(['', '', '', '']);
  const [newCorrectAnswer, addnewCorrectAnswer] = useState('');
  const [error, setError] = useState('');
  const validateForm = () => {
    if (!newQuestion.trim()) {
      setError('Question cannot be empty.');
      return false;
    }
    if (newOptions.some(option => !option.trim())) {
      setError('All options must be filled.');
      return false;
    }
    if (!newCorrectAnswer) {
      setError('Please select the correct answer.');
      return false;
    }
    setError('');
    return true;
  };
  const handleAnswer = () => {
    if(validateForm()){
        const newId = questions.length ;
        const newQuestionObj={
          id: newId,
          question: newQuestion,
          options: newOptions,
          correctAnswer: newCorrectAnswer,
        };
        questions.push(newQuestionObj)
        const savedQuestions=JSON.parse(localStorage.getItem('questions') ||  '[]');
        savedQuestions.push(newQuestionObj);
        localStorage.setItem('questions',JSON.stringify(savedQuestions))
        addNewQuestion('')
        addNewOptions(['','','',''])
        addnewCorrectAnswer('')
        swal({
          title: "Success!",
          text: "Your question has been added.",
          icon: "success",
          buttons: ["OK"],
        });
    }
   

  }
  return (
    <>
      <Navbar />
      <div className='text-white font-extrabold flex flex-col '>
        <div className='ml-[240px] rounded-xl mt-20 '>
          <label className='text-3xl mr-4'>Question</label>
          <input value={newQuestion} placeholder=' Enter New Question' onChange={(e) => addNewQuestion(e.target.value)} type='text' className='border-slate-700-800 border-2 justify-center w-[600px] h-[40px] text-black' />
        </div>

        <div className='justify-between mr-4 flex flex-row px-[250px] mt-20 '>
          <label className='text-3xl mr-4'>Options</label>
          {newOptions.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...newOptions];
                updatedOptions[index] = e.target.value;
                addNewOptions(updatedOptions);
              }}
              placeholder={`Option ${index + 1}`}
              className="block mb-2 h-[40px] border rounded justify-between text-black  mt-4"
            />
          ))}

        </div>
        <div className='mt-20 ml-[155px]'>
          <label className='text-3xl mr-4'>Correct Answer</label>
          <select
            onChange={(e) => addnewCorrectAnswer(e.target.value)}
            value={newCorrectAnswer}
            className='border-2 border-slate-700-800 rounded-md h-10 text-black'
          >
            <option value='' disabled>
              Select Correct Answer
            </option>
            {newOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

        </div>
        {error && <div className='text-red-500 ml-[240px] mt-4'>{error}</div>}
        <button onClick={handleAnswer} className=' bg-red-600 w-[160px] text-white  rounded-lg h-[50px] ml-[680px] mt-20'>Add Question</button>





      </div>
    </>
  )
        }
        export default Add;
