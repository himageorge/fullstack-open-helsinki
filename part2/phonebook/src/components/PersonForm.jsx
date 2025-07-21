const PersonForm = ({name,number,handleNameChange,handleNumberChange,addPerson}) =>{
    return(
        <form onSubmit={addPerson}>
        <div>
          <ul>
            <li>
              name: <input value={name} onChange={handleNameChange}/>
            </li>
            <li>
              number: <input value={number} onChange={handleNumberChange}/>
            </li>  
          </ul>
        </div>
        <div>
          <button type="submit">add</button>
        </div>

      </form>
    )
}
export default PersonForm