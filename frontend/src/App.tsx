import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Preloader from "./components/Preloader/Preloader";
import Table from "./components/Table/Table";
import { $api } from "./services/axios";
import Detector from "./assets/Detector.svg?react";
import LineChart from "./components/LineChart";
import styles from "./pages/MainPage/MainPage.module.css";

function App() {
  const [chartsData, setChartsData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [tagName, setTagName] = useState('Tag1')

  const onChangeTagName = (e) => {
    setTagName(e.target.value);
  };


  const onChangeStart = (e) => {
    setStart(e.target.value);
  };

  const onChangeEnd = (e) => {
    setEnd(e.target.value);
  };

  const onDetect = () => {
    const params = new URLSearchParams()
    params.append('tag_name', tagName)
    params.append('start', start)
    params.append('end', end)
    const getData = async () => {
      const result = await $api.get("/", {params});
      return result.data;
    };
    setIsLoad(true);
    getData()
      .then((res) => setChartsData(res))
      .catch((error) => console.log(error))
      .finally(() => setIsLoad(false));

  };

  useEffect(() => {
    const params = new URLSearchParams()
    params.append('tag_name', tagName)
    const getData = async () => {
      const result = await $api.get("/", {params});
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
    <>
      <Header options={chartsData?.columns} value={tagName} onChange={onChangeTagName}/>
      <div className={styles.MainPage}>
        <LineChart className={styles.lines} data={chartsData} tagName={tagName}/>
        <div className={styles.inputs}>
          <input type="datetime-local" value={start} onChange={onChangeStart} />
          <button className={styles.button} type="button" onClick={onDetect}>
            <Detector />
            Детектировать
          </button>
          <input type="datetime-local" value={end} onChange={onChangeEnd} />
        </div>
        <Table data={chartsData.X} />
      </div>
    </>
  );
}

export default App;
