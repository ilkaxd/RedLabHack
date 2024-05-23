import styles from "./Header.module.css";
import Logo from "../../assets/Logo.svg?react";
import Export from "../../assets/Export.svg?react";
import Import from "../../assets/Import.svg?react";

const Header = () => {
  return (
    <div className={styles.Header}>
      <h1>
        <Logo /> 
        Выявление аномалий во временном ряду
      </h1>
      <div>
        <button><Export/>Экспорт</button>
        <button><Import/>Импорт</button>
      </div>
    </div>
  );
};

export default Header;
