import styles from './Table.module.css'

interface IProps {
  data: [];

}
const Table = (props: IProps) => {
  const { data } = props;
  return (
    <table>
      <thead className={styles.header}>
        {data?.columns?.map((el) => (
          <th key={el}>{el}</th>
        ))}
      </thead>
      <tbody className={styles.body}>
        {data?.X?.map((el) => (
          <tr key={`${el}${Math.random()}`}>
            {el.map((item) => (
              <td key={`${item}${Math.random()}`}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
