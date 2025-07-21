const Notification = ({ message, successful}) => {
    const notificationStyle = {
        color: successful? 'green': 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '10px'
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
export default Notification