import React from 'react'
// import moment from 'moment'

const DueDate = () => {
  const dueDate = new Date(new Date().setDate(new Date().getDate() + 30))
  // const dueDate = moment().format("MM/DD/YYYY")

  return (
    <span>
      <strong>{dueDate.toUTCString()}</strong>
      {/* <strong>{dueDate.toLocaleDateString()}</strong> */}
    </span>
  )
}

export default DueDate
