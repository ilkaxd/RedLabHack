import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface IProps {
  data: [];
}
const HorizontalBarChart = (props: IProps): JSX.Element => {
  const { data } = props;

  const horizontalBars = useRef();

  useEffect(() => {
    const getOption: object = () => {
      return {
      }
    };
    const horizontalBarsChart = echarts.init(horizontalBars.current, null, {
      renderer: "svg",
    });
    horizontalBarsChart.setOption(getOption());
  }, [data]);

  return (
    <div>
      <div  ref={horizontalBars} />
    </div>
  );
};

export default HorizontalBarChart;
