import React from 'react'

import "./Card.css"

import {FaArrowRight} from "react-icons/fa"

let ResultToCard = ({giver,amount,taker}) => {

    return(
        <div className='resultToCard'>
            <div>{giver}</div>
            <div><FaArrowRight /></div>
            <div>{amount}</div>
            <div><FaArrowRight /></div>
            <div>{taker}</div>
        </div>
    )

}

export default ResultToCard