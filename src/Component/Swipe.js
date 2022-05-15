import React, { useState } from 'react'

function Swipe({toggle,updateToggle, backgroundColor,onClick}){
    // let [toggle,updateToggle] = useState(true)
    return(
        <div style={{display : "flex", width:"min-content", backgroundColor : backgroundColor, borderRadius : 20, padding: 3, cursor : 'pointer',transitionDuration: '1s', height : 20, width :40 }} onClick={onClick}>
            {/* Light mode */}
            <div style={{borderRadius : "100%", padding : 10, backgroundColor : "yellow", visibility : toggle?'visible':'hidden'}}/> 
            {/* dark mode */}
            <div style={{borderRadius : "100%", padding : 10, backgroundColor : "#e8e6cc",visibility : !toggle?'visible':'hidden' }}/>
        </div>
    )
}

export default Swipe