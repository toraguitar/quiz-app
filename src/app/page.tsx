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
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);

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

  /**
   * ランダムに生成した番号を元にクイズをセットする
   */
  useEffect(() => {
    const quizList: Question[] = [];
    const numberList = getNumbers();
    for (let i = 0; i < numberList.length; i++) {
      quizList.push(data[numberList[i]]);
    }
    setQuestions(quizList);
  }, []);

  // 回答選択のハンドラー
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  }

  const handleNextQuestion = () => {
      setScore(score + 1);
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (questions.length === 0) return;

  return (
    <div className="quizApp">
      <h2 className="quizApp__title">
        クイズアプリ{currentQuestionIndex + 1}問目
      </h2>
      <p className="quizApp__questionTitle">{currentQuestion.question}</p>
      <ul className="quizApp__list">
      {currentQuestion.options.map((option, index) => (
        <li key={index}>
          <button type="submit" className="quizApp__listButton" key={index}>
            <label className="quizApp__listLabel" key={index}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
              />
              {option}
            </label>
          </button>
        </li>
      ))}
      </ul>
      <button className="quizApp__nextButton" onClick={handleNextQuestion} disabled={selectedAnswer === ''}>
        次の問題へ
      </button>
    </div>
  )
}

