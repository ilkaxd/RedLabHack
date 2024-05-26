/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { separateAnomalies, setRange } from "../utils";
interface IProps {
  data:
    | {
        Y: { is_anomaly: boolean }[];
        X: any[];
        indexes: string[];
      }
    | undefined;
  className: string;
  tagName: string;
}

const LineChart = (props: IProps) => {
  const { data, className, tagName } = props;

  const ref = useRef();

  useEffect(() => {
    const anomaliesArray = separateAnomalies(data?.Y);
    const sort = setRange(anomaliesArray);
    const tag = {
      "Throughput":0,
      "WebResponse":1,
      "APDEX":2
    }
    const result =  data?.X?.map((el) => el[tag[tagName]])
    const getOption: object = () => {
      return {
        grid: {
          width: "auto",
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
          data: data?.indexes,
        },
        yAxis: {
          type: "value",
          name:tagName,
          // nameLocation:'middle'
        },

        series: [
          {
            type: "line",
            data: result,
            itemStyle: {
              color: (param) => {
                if (data?.Y[param.dataIndex]?.is_anomaly) {
                  return "red";
                } else {
                  return "black";
                }
              },
            },
            markArea: {
              tooltip: {
                show: false,
              },
              itemStyle: {
                color: "rgba(255, 173, 177, 0.4)",
              },
              data: sort.map((el) => [{ xAxis: el[0] }, { xAxis: el[1] }]),
            },
          },
        ],
      };
    };
    const linesChart = echarts.init(ref.current, null, {
      renderer: "svg",
    });
    linesChart.setOption(getOption());
  }, []);

  return <div className={className} ref={ref} />;
};

export default LineChart;
