import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    const personExists = persons.find((n) => n.name === newName)
    const updatedPerson = { ...personExists, number: newNumber}
    
    if (personExists && window.confirm(`${personObject.name} is already added to phonebook, replace old number with new one?`)){
      personsService
      .update(updatedPerson.id, updatedPerson)
      .then(returnedPerson =>{
        setPersons(persons.map(person => 
          person.name === newName? returnedPerson: person))
      })
      .then(message => {
        setMessage(
          `Changed ${personObject.name}'s number`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${personObject.name} has already been removed from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== updatedPerson.id))
      })
    }else if(!personExists){
      personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      .then(message => {
        setMessage(
          ` Added ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    }
    setNewName('')
    setNewNumber('')
  }
  

  const handleRemove = (id) =>{
    const removePerson = persons.find((n) => n.id === id)
    if(window.confirm(`Delete ${removePerson.name}?`)){ 
        personsService.remove(removePerson.id).then(()=> {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLocaleLowerCase().includes(searchName.toLowerCase()))

  const handleSearchNameChange = (event) =>{
    setSearchName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} successful={true} />
      <Notification message={error} successful={false} />
      <Filter name={searchName} handleChange={handleSearchNameChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
                  name={newName} handleNameChange={handleNameChange}
                  number={newNumber} handleNumberChange={handleNumberChange}  />
      <h2>Numbers</h2>
      <Persons filteredList={personsToShow} handleRemove={handleRemove}/>
    </div>
  
  )
}

export default App