import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface IProps {
  data: [];
  className:string
}
const HorizontalBarChart = (props: IProps): JSX.Element => {
  const { data, className } = props;

  const horizontalBars = useRef();

  useEffect(() => {
    const getOption: object = () => {
      return {
        title: {
          // text: 'World Population'
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
          {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      }
    };
    const horizontalBarsChart = echarts.init(horizontalBars.current, null, {
      renderer: "svg",
    });
    horizontalBarsChart.setOption(getOption());
  }, []);

  return (
      <div className={className} ref={horizontalBars} />
  );
};

export default HorizontalBarChart;
