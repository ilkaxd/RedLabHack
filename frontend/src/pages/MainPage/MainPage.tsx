import { useEffect, useState } from "react";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import { $api } from "../../services/axios";
import LineChart from "../../components/LineChart";
import Table from "../../components/Table/Table";
import styles from "./MainPage.module.css";
import Preloader from "../../components/Preloader/Preloader";

const MainPage = () => {
  const [chartsData, setChartsData] = useState([]);
 const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    const getData = async () => {
      const result = await $api.get("/");
      return result.data;
    };
    setIsLoad(true)
    getData()
    .then((res) => setChartsData(res))
    .catch((error)=>console.log(error))
    .finally(()=>setIsLoad(false))
  }, []);

  if(isLoad){
  return(<Preloader/>)
  }
  return (
    <div className={styles.MainPage}>
      <div className={styles.charts}>
        <LineChart className={styles.lines} data={chartsData} />
        <HorizontalBarChart className={styles.bars} data={chartsData} />
      </div>
      <Table data={chartsData.X} />
    </div>
  );
};

export default MainPage;
