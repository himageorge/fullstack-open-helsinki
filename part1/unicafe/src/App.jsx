import { useState } from 'react'

const StatisticsLine = (props) => {
  return(
<tr>
  <td>{props.text}</td>
  <td>{props.value}</td>
</tr>)}

const Statistics = (props) => {
  if(props.count === 0){
    return(<div>
      No feedback given
    </div>)
  }
   return (
    <table>
      <tbody>
      <StatisticsLine text='good' value={props.good} />
      <StatisticsLine text='bad' value={props.bad} />
      <StatisticsLine text='neutral' value={props.neutral} />
      <StatisticsLine text='all' value={props.count} />
      <StatisticsLine text='average' value={props.avg} />
      <StatisticsLine text='positive' value={`${props.positive} %`}/>
      </tbody>
    </table>
  )

}
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)

  let avg = count === 0 ? 0 : score / count
  let positive = count === 0 ? 0 : (good / count) * 100

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setCount(updatedGood + neutral + bad)
    const updatedScore = score + 1
    setScore(updatedScore)
  
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setCount(updatedNeutral + good + bad)
    setScore(score) 
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setCount(updatedBad + good + neutral)
    const updatedScore = score - 1
    setScore(updatedScore)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} count={count} avg={avg} positive={positive}/>

    </div>
  )
}

export default App
