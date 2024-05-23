import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg?react";
import Export from "../../assets/Export.svg?react";
import Import from "../../assets/Import.svg?react";

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo_block}>
        <Logo /> 
        <h1>Выявление аномалий во временном ряду</h1>
      </div>
      <div className={styles.Buttons_block}>
        <button className={styles.Button}><Export/>Экспорт</button>
        <button className={styles.Button}><Import/>Импорт</button>
      </div>
    </div>
  );
};

export default Header;
