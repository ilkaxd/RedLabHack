import { useEffect, useRef } from 'react';
import * as echarts from "echarts";
interface IProps {
    data: any;
    className:string;
    tagName:string
  }
  
const LineChart = (props:IProps) => {
    const { data, className, tagName } = props;

  const ref = useRef();

  useEffect(() => {
    const getOption: object = () => {
      return {
        grid:{
            width:'auto'
        },
        tooltip: {

          show: true,
        },
        xAxis: {
            type: 'category',
            data: data?.indexes
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: data?.X?.map((el)=>el[tagName.slice(-1)-1])
          }
        ]
      }
    };
    const linesChart = echarts.init(ref.current, null, {
      renderer: "svg",
    });
    linesChart.setOption(getOption());
  }, []);


  return (
      <div className={className} ref={ref} />
  );
};

export default LineChart;