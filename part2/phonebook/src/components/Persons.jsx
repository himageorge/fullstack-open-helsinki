const Persons = ({filteredList, handleRemove}) =>{
    return(
        <ul>
        {filteredList.map(person => (
            <div key={person.id}> {person.name} {person.number}
             <button onClick={() =>handleRemove(person.id)}>delete</button>
            </div>)
            )}
        </ul>
    )
}
export default Persons