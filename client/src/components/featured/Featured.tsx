import "./featured.scss"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

 const Featured = () => {
  return (
    <div className="featured">
     <div className="content">
        <div className="featuredChart">
            <CircularProgressbar value = {50} text={"50%"} strokeWidth={5}/>
        </div>


     </div>
    </div>
    )
}

export default Featured;
