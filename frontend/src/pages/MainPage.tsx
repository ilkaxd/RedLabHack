import React, { useEffect, useState } from 'react';
import HorizontalBarChart from '../components/HorizontalBarChart';
import { $api } from '../services/axios';

const MainPage = () => {
    const [horizontalBarsData, setHorizontalBarsData] = useState([])
    useEffect(()=>{
        const getData = async()=>{
            const result = await $api.get('/')
           return result.data
        }
        getData().then((res)=>console.log(res))

    },[])
    return (
        <div>
            <HorizontalBarChart data={horizontalBarsData}/>
        </div>
    );
};

export default MainPage;