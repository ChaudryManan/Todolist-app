import React from 'react'

const Count = (props) => {
    console.log(props.count)
    // const style={
    //     display:props.count>0 ?"block":"none"
    // }
  return (
 <div className='count' >  <h3>number of tasked to complete:<span className='count-span'>{props.number}</span></h3></div>
  )
}

export default Count