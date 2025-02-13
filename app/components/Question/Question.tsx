import type React from "react"

const Question= () => {
  return (
    <div className="quiz-question">
      <h2 className="quiz-question__title">日本の首都は？</h2>
      <div className="quiz-question__options">
        <button type="button" className="quiz-question__option">大阪</button>
        <button type="button" className="quiz-question__option">京都</button>
        <button type="button" className="quiz-question__option">東京</button>
        <button type="button" className="quiz-question__option">横浜</button>
      </div>
    </div>
  )
}

export default Question
