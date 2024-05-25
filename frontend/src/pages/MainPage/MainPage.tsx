import { useEffect, useState } from "react";
import { $api } from "../../services/axios";
import LineChart from "../../components/LineChart";
import Table from "../../components/Table/Table";
import styles from "./MainPage.module.css";
import Preloader from "../../components/Preloader/Preloader";
import Detector from "../../assets/Detector.svg?react";

const MainPage = () => {
  const [chartsData, setChartsData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const onChangeStart = (e) => {
    setStart(e.target.value);
  };

  const onChangeEnd = (e) => {
    setEnd(e.target.value);
  };

  const onDetect = () => {};

  useEffect(() => {
    const getData = async () => {
      const result = await $api.get("/");
      return result.data;
    };
    setIsLoad(true);
    getData()
      .then((res) => setChartsData(res))
      .catch((error) => console.log(error))
      .finally(() => setIsLoad(false));
  }, []);

  if (isLoad) {
    return <Preloader />;
  }

  return (
    <div className={styles.MainPage}>
      <LineChart className={styles.lines} data={chartsData} />
      <div className={styles.inputs}>
        <input type="datetime-local" value={start} onChange={onChangeStart} />
        <button className={styles.button} type="button" onClick={onDetect}>
          <Detector />
          Детектировать
        </button>
        <input type="datetime-local" className={styles.input} value={end} onChange={onChangeEnd} />
      </div>
      <Table data={chartsData.X} />
    </div>
  );
};

export default MainPage;
