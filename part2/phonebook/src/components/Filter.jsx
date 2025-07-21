const Filter =({name, handleChange}) =>{
  return(
  <form>
    <div>
        filter shown with <input value={name} onChange={handleChange}/>
        </div>
  </form>
  )
}
export default Filter
