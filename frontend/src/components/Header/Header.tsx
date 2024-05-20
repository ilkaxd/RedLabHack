import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.Header}>
            <button>
                Button 1
            </button>
            <button>
                Button 2
            </button>
        </div>
    );
};

export default Header;