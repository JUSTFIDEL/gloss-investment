// import React, { useEffect, useState } from 'react'

// const DueDate = () => {
//   // const dueDate = new Date(new Date().setDate(new Date().getDate() + 30))
//   // const dueDate = moment().format("MM/DD/YYYY")

//   const futureDate = new Date(new Date().setDate(new Date().getDate() + 30))
//   const [dueDate, setDueDate] = useState(localStorage.getItem(futureDate) || [])

//   useEffect(() => {
//     const dueDate = JSON.parse(
//       .setItem('futureDate', JSON.stringify(futureDate))
//     )

//     if (dueDate) {
//       setDueDate(dueDate)
//     }
//   }, [])

//   return (
//     <span>
//       <strong>{dueDate}</strong>
//       {/* <strong>{dueDate.toUTCString()}</strong> */}
//       {/* <strong>{dueDate.toLocaleDateString()}</strong> */}
//     </span>
//   )
// }

// export default DueDate
