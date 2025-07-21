const Header = ({course}) => <h2>{course.name}</h2>

const Content = (props) => {
  const allParts = props.parts.map((element) => <Part key={element.id} part={element}/>)
  
  return <div>{allParts}</div>
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)


const Total = (props) => {
  const total = props.parts.reduce((sum,element) =>  sum + element.exercises,0)
    return <p>Total number of exercises: {total}</p>
}

const Course = ({course}) =>{
  return(
  <div>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}
export default Course