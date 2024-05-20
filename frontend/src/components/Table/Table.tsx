import styles from './Table.module.css'

interface IProps {
  data: [];

}
const Table = (props: IProps) => {
  const { data } = props;
  return (
    <table>
      <thead className={styles.header}>
        {data?.[0].map((el, index) => (
          <th key={index}>{`X${index + 1}`}</th>
        ))}
      </thead>
      <tbody className={styles.body}>
        {data?.map((el) => (
          <tr key={el}>
            {el.map((item) => (
              <td key={item}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
