import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import InfoIcon from '@mui/icons-material/Info';
import SensorsIcon from '@mui/icons-material/Sensors';
import Featured from "../featured/Featured";
type WidgetType = "plantTotal" | "plantDevelopment" | "sensor" | "developmentInfo";
interface WidgetProps {
    type: WidgetType;
  }


const Widget =({ type }: WidgetProps) => {

let data;

    switch(type) {
        case "plantTotal":
            data = {
                title: "PLANTS",
                link: "See all plants",
                icon: (
                    <YardOutlinedIcon className = "icon" style = {{color:"green", backgroundColor: "lightgray"}}/>
                )
            };
        break;
        case "plantDevelopment":
            data = {
                title: "GROWTH",
                link: "See all growth info",
                icon: (
                    <ArrowOutwardIcon className = "icon" style = {{color:"brown", backgroundColor: "lightgray"}}/>
                ),
                chart: (
                    <Featured/>
                ),
                chartMessage: (
                    "2 plants are in Harvest Phase"
                )
            };
        break;
        case "sensor":
            data = {
                title: "ENVIRONMENT",
                link: "See sensor in detail",
                icon: (
                    <SensorsIcon className = "icon" style = {{color:"blue", backgroundColor: "lightgray"}}/>
                )
            };
        break;
        case "developmentInfo":
            data = {
                title: "PHASE INFO",
                link: "What does it mean ?",
                icon: (
                    <InfoIcon className = "icon" style = {{color:"black", backgroundColor: "yellow"}}/>

                )
            };
        break;

        default:
        break;

    }
  return (
    <div className="widget">
        <div className="left">
        <span className="title"> {data!.title}</span>
        <div className="chart">
         {data!.chart}
        </div>
        <span className="link"> {data!.link}</span>
        </div>
        <div className="right">
        <div className="percentage positive">
            <KeyboardArrowUpOutlinedIcon />
            20%
        </div>
        <div className="chartExp">
            {data?.chartMessage}
            </div>
         {data!.icon}
        </div>
    </div>
    )
}

export default Widget;
