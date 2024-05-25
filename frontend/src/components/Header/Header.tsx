import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg?react";
import Export from "../../assets/Export.svg?react";
import Import from "../../assets/Import.svg?react";
interface IProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}
const Header = ({ options, value, onChange }: IProps) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo_block}>
        <Logo />
        <h1>Выявление аномалий во временном ряду</h1>
      </div>
      <div className={styles.Buttons_block}>
        <select
          className={styles.Button}
          value={value}
          onChange={onChange}
          defaultValue={"Througput"}
        >
          {options?.map((el) => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <button className={styles.Button}>
          <Import />
          Импорт
        </button>
      </div>
    </div>
  );
};

export default Header;
