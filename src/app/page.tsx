"use client"

import { useEffect, useState } from "react";
import data from "../data/data.json"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  /**
   * 問題番号をランダムに3つ出す
   * @returns {number[]} ランダムに抽出された問題の番号群
   */
  const getNumbers = () => {
    const numList: number[] = [];
    let count = 0;

    while (count < 3) {
      const num = Math.floor(Math.random() * 10);
      if (!numList.includes(num)) {
        numList.push(num);
        count = count + 1;
      }
    }

    return numList;
  };

  useEffect(() => {
    const quizList: Question[] = [];
    const numberList = getNumbers();
    for (let i = 0; i < numberList.length; i++) {
      quizList.push(data[numberList[i]]);
    }
    setQuestions(quizList);
    console.log(quizList);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  if (questions.length === 0) return;

  return (
    <div className="quizApp">
      <h2 className="quizApp__title">
        クイズアプリ{currentQuestionIndex + 1}問目
      </h2>
      <p className="quizApp__questionTitle">{currentQuestion.question}</p>
      <ul className="quizApp__list">
        <li className="quizApp__listItem">
        {currentQuestion.options.map((option, index) => (
          <label key={index} className="">
            <input
              type="radio"
              name="answer"
              value={option}
            />
            {option}
          </label>
        ))}
        </li>
      </ul>
      <button className="">
        次の問題へ
      </button>
    </div>
  )
}

