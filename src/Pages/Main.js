import React, {useContext, useState} from 'react'
import Card from '../Component/Card'
import ResultToCard from '../Component/ResultToCard'
import Swipe from '../Component/Swipe'
import { Theme } from '../Context/Provider'
import Calculate from './Calculation'

import "./Main.css"

import {FaAngleLeft} from "react-icons/fa"

let all = []

function Main(){

    let {themeMode, changeTheme, colorFunction} = useContext(Theme)
    let primary = colorFunction(themeMode,'primary')
    let secondary = colorFunction(themeMode,'secondary')


    let [result,updateResult] = useState(false)

    let [showAdd, updateShowAdd] = useState(false)
    // console.log("Main -->",themeMode,primary)
    // console.log(window.innerHeight)


    let [name,updateName] = useState('')
    let [number,updateNumber] = useState('')

    let [ans,updateAns] = useState()

    return(
        <div style={{backgroundColor: primary["backgroundColor"], height : window.innerHeight, display : "flex", justifyContent : "center"}}>

            {showAdd ? (
                <div className='dialog' >
                    
                    <div className="inputShow">
                            <div className="containerOfCloseButton">
                                <div className="closeButton" onClick={() => {
                                    updateShowAdd(false)
                                }}>X</div>
                            </div>
                            <div style={{ paddingRight: "10px", paddingLeft: "10px", paddingTop: "5px" }}>
                                <input type="text" placeholder="Name" value={name}  onChange={(e) => {
                                    updateName(e.target.value)
                                }}/>
                                <input type="number" placeholder="Amount" value={number} onChange={(e) => {
                                    updateNumber(e.target.value)
                                }} />
                                <button onClick={() => {
                                     
                                    let k = { Name: name, Amount: parseInt(number) }
                                    all.push(k)
                                    updateName('')
                                    updateNumber('')
                                    console.log("78069",all,k)
                                    updateShowAdd(false)
                                }}>Submit</button>
                            </div>
                        </div>
                    
                </div>
            ) : void 0}

            <div style={{backgroundColor : secondary["light"],width : 500, height : window.innerHeight}}>
                <nav style={{display : 'flex', padding: 10, justifyContent : 'space-between', alignItems : 'center'}}>
                    <div style={{display : "flex", alignItems : 'center'}}>
                        {result ? 
                        <div onClick={()=>{
                            updateResult(false)
                        }} style={{fontSize : 30, cursor : "pointer", color : "white", display : "flex",alignItems : "center"}}>
                            <FaAngleLeft />
                        </div> 
                        :   
                            void 0
                         }
                    {/* back button */}
                        <div />
                        <div style={{color : "white", fontSize : 25, fontWeight : 'bold',fontFamily : 'cursive'}}>Swiper</div>
                    </div>
                    <Swipe toggle={themeMode} backgroundColor={primary["main"]} onClick={()=>{
                        changeTheme(!themeMode)
                    }}/>
                </nav>
                
                {!result ? 
                (
                    <>
                        <div style={{marginLeft : 10,marginRight : 10 , height : "580px", backgroundColor : primary["light"], overflow : "scroll", overflowX : "hidden", overflowY : "auto"}}>


                         {all.map((x,y)=>{
                             return(
                                <Card Name={x.Name} Amount={x.Amount}/>
                             )
                         })}


                        <div className="addbutton" onClick={()=>{
                    updateShowAdd(true)
                }} >
                    +
                </div>
                          
                        </div>
                        <div  className="ResultButton" style={{ backgroundColor: primary["main"]}} onClick={()=>{
                            let k =Calculate(all)
                            // console.log("answer from function",Calculate(all))
                            // console.log("answer in a variable",k)
                            updateAns(k)
                            updateResult(true)
                        }}>
                            Results
                        </div>
                </>
                ) 
                :(
                    <div style={{marginLeft : 10,marginRight : 10 , height : "610px", padding : 1 ,backgroundColor : primary["light"]}}>
                        <div>
                       {ans.map((x,y)=>{
                           return(
                               <ResultToCard giver={x.giver} amount={x.amount} taker={x.taker} />
                           )
                       })}
                       </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main