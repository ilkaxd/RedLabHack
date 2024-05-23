import { useEffect, useRef } from 'react';
import * as echarts from "echarts";
interface IProps {
    data: [];
    className:string;
  }
  
const LineChart = (props:IProps) => {
    const { data, className } = props;

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
        title: {
          // text: 'World Population'
        },
        xAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
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