import { useEffect, useState } from "react";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import { $api } from "../../services/axios";
import LineChart from "../../components/LineChart";
import Table from "../../components/Table/Table";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await $api.get("/");
      return result.data;
    };
    getData().then((res) => setChartsData(res));
  }, []);

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
