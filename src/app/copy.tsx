"use client"

import { useState, useEffect } from "react"
import quizData from "../data/data.json"
import styles from "./page.module.css"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [quizEnded, setQuizEnded] = useState(false)

  useEffect(() => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 3))
  }, [])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
    } else {
      setQuizEnded(true)
    }
  }

  const resetQuiz = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 3))
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setScore(0)
    setQuizEnded(false)
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  if (quizEnded) {
    return (
      <div className={styles.quizCard}>
        <h2>クイズ結果</h2>
        <p className={styles.result}>
          {score} / {questions.length} 問正解
        </p>
        <button onClick={resetQuiz} className={styles.button}>
          もう一度挑戦する
        </button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className={styles.quizCard}>
      <h2>
        問題 {currentQuestionIndex + 1} / {questions.length}
      </h2>
      <p>{currentQuestion.question}</p>
      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => (
          <label key={index} className={styles.option}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleAnswerSelect(option)}
            />
            {option}
          </label>
        ))}
      </div>
      <button onClick={handleNextQuestion} disabled={!selectedAnswer} className={styles.button}>
        {currentQuestionIndex === questions.length - 1 ? "結果を見る" : "次の問題へ"}
      </button>
    </div>
  )
}

