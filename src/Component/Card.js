import React from 'react'

import "./Card.css"

import { FaTrashAlt } from "react-icons/fa"

const Card = (props) => {


    return(
        <div className='topCard'>
            <div>
            <div className='name'>{props.Name}</div>
            <div className='amount'>₹ {props.Amount}</div>
            </div>
            <div style={{color : "white", cursor : "pointer", fontSize : 30, paddingRight : 10}}>
                <FaTrashAlt />
            </div>
        </div>
    )

}

export default Card