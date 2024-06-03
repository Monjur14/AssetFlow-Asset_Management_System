/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'

const AboutUsPoints = ({ tag, tittle, bg}) => {
  return (
    <div className="flex gap-3">
        <div>
            <span className={`text-[1.5rem] p-2 rounded-full text-white ${bg} inline-block`}><IoMdCheckmark /></span>
        </div>
        <div>
            <h1  className="text-2xl font-semibold">{tag}</h1>
            <p className="max-w-[600px] text-gray-700 mt-1">{tittle}</p>
        </div>
      </div>
  )
}

export default AboutUsPoints
