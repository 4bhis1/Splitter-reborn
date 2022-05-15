import React, {useContext, useState} from 'react'
import Swipe from '../Component/Swipe'
import { Theme } from '../Context/Provider'

function Main(){

    let {themeMode, changeTheme, colorFunction} = useContext(Theme)
    let primary = colorFunction(themeMode,'primary')
    let secondary = colorFunction(themeMode,'secondary')
    // console.log("Main -->",themeMode,primary)
    // console.log(window.innerHeight)
    return(
        <div style={{backgroundColor: primary["backgroundColor"], height : window.innerHeight}}>
            <div style={{backgroundColor : secondary["light"],width : 500, height : window.innerHeight}}>
                <nav style={{display : 'flex', padding: 10, justifyContent : 'space-between', alignItems : 'center'}}>
                    {/* back button */}
                    <div>
                        <div />
                        <div style={{color : "white", fontSize : 25, fontWeight : 'bold',fontFamily : 'cursive'}}>Swiper</div>
                    </div>
                    <Swipe toggle={themeMode} backgroundColor={primary["main"]} onClick={()=>{
                        changeTheme(!themeMode)
                    }}/>
                </nav>
                <div style={{marginLeft : 10,marginRight : 10 , height : "580px", backgroundColor : primary["light"]}}>

                </div>
                <div style={{margin : 10, backgroundColor: primary["main"]}}>
                    Results
                </div>
            </div>
        </div>
    )
}

export default Main