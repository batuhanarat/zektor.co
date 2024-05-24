// In Featured.js or Featured.tsx
import React from 'react';
import "./featured.scss"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

interface FeaturedProps{
    percentage: number;
}
const Featured :React.FC<FeaturedProps> = ({ percentage }) => {
  return (
    <div className="featured">
     <div className="content">
        <div className="featuredChart">
            <CircularProgressbar value={percentage} text={`${percentage.toFixed(2)}%`} strokeWidth={5}/>
        </div>
     </div>
    </div>
  )
}

export default Featured;