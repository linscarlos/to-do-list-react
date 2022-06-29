import Logo from '../../images/to-do-logo.svg'
import styles from './Header.module.css'

export function Header(){
    return (
        <header className={styles.header}>
            <img src={Logo} />
        </header>
    )
}