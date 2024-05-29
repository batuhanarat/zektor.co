import React, { useState, useEffect } from 'react';
import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import InfoIcon from '@mui/icons-material/Info';
import SensorsIcon from '@mui/icons-material/Sensors';
import Featured from "../featured/Featured";
import { TSensor, getSensor } from '../../api/getSensor';

import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { TPlant, getPlants } from '../../api/getPlants';

type WidgetType = "plantTotal" | "plantDevelopment" | "sensor" | "developmentInfo";

interface WidgetProps {
    type: WidgetType;
}

const Widget = ({ type }: WidgetProps) => {
    const [plants, setPlants] = useState<TPlant[]>([]);
    const [devPhase4Count, setDevPhase4Count] = useState<number>(0);
    const [temperature, setTemperature] = useState<number | undefined>(undefined);
    const [humidity, setHumidity] = useState<number | undefined>(undefined);
    const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');

    useEffect(() => {
        if (type === "sensor" && userId) {
            const fetchSensorData = async () => {
                try {
                    const allSensors: TSensor[] = await getSensor(userId);
                    const lastSensor: TSensor = allSensors[allSensors.length - 1];
                    setTemperature(lastSensor.temperature);
                    setHumidity(lastSensor.humidity);
                } catch (error) {
                    console.error('Failed to fetch sensor data:', error);
                    setTemperature(0);
                    setHumidity(0);
                }
            };
            fetchSensorData();
        }
        if (type === "plantDevelopment" && userId) {
            const fetchPlantData = async () => {
                try {
                    const allPlants: TPlant[] = await getPlants(userId);
                    setPlants(allPlants);
                } catch (error) {
                    console.error('Failed to fetch plant data:', error);
                }
            };
            fetchPlantData();
        }
    }, [type, userId]);
    useEffect(() => {
        if (plants.length > 0) {
            const phase4Count = plants.filter(plant => plant.developmentPhase === 4).length;
            setDevPhase4Count(phase4Count);
        }
    }, [plants]);
    let data: any;

    const phase4Percentage = plants.length > 0 ? (devPhase4Count / plants.length) * 100 : 0;


    switch (type) {
        case "plantTotal":
            data = {
                title: "PLANTS",
                link: "See all plants",
                icon: (
                    <YardOutlinedIcon className="icon" style={{ color: "green", backgroundColor: "lightgray" }} />
                ),
                plantTotal: (
                    `-> 4 Lettuces `
                ),
            };
            break;
       case "plantDevelopment":
            data = {
                title: "GROWTH",
                link: "See all growth info",
                icon: (
                    <ArrowOutwardIcon className="icon" style={{ color: "brown", backgroundColor: "lightgray" }} />
                ),
                chart: (
                    <Featured percentage={phase4Percentage} />
                ),
                chartMessage: (
                    `${devPhase4Count} plants are in Harvest Phase`
                )
            };
            break;
        case "sensor":
            data = {
                title: "ENVIRONMENT",
                link: "See sensor in detail",
                icon: (
                    <SensorsIcon className="icon" style={{ color: "blue", backgroundColor: "lightgray" }} />
                ),
                sensorData: (
                    <div className="sensor-values">
                        <div className="sensor-value" style={{ display: 'flex', alignItems: 'center' }}>
    <ThermostatIcon />
    <span><p style={{ margin: '0', fontSize: '12px' }}>{`${temperature} °C`}</p></span>
</div>
<div className="sensor-value" style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                            <WaterDropIcon/>
                            </div>
                            <span><p style={{ margin: '0', fontSize: '12px' }}>{`${humidity} g/m^3`}</p></span>
                        </div>
                    </div>
                )
            };
            break;
        case "developmentInfo":
            data = {
                title: "PHASE INFO",
                link: "What does it mean ?",
                content: (
                    <div>
                    <div className="phaseInfo">
                        <p>Phase 1: Cotyledon</p>
                        <p>Phase 2: Rosetta</p>
                        <p>Phase 3: Heading</p>
                        <p>Phase 4: Harvest</p>
                    </div>


                    </div>

                ),
                icon: (
                    <InfoIcon className="icon" style={{ color: "black", backgroundColor: "yellow" }} />
                )
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
           <div className="left">
    <span className="title">{data!.title}</span>
    {type === "plantDevelopment" && <div className="chart">{data?.chart}</div>}
    <div className='totalPlant'>
        {data!.plantTotal}
    </div>
    <div className="phaseInfo">
        {data!.content}
    </div>
    <div className="sensorData">
        {data!.sensorData}
    </div>
</div>
<div className="right">
    <div className="percentage positive">
        <KeyboardArrowUpOutlinedIcon />

    </div>
    {type === "plantDevelopment" && <div className="chartExp">{data?.chartMessage}</div>}
    {data!.icon}
</div>
        </div>
    )
}

export default Widget;