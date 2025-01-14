import styles from './Rodape.module.css'
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from "react-icons/io";
import logo from './logo.png'
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa'

function Rodape() {
    return (
        <footer className={styles.rodape}>
            <Link to="./" className={styles.logo}>
                <img src={logo} alt="LogoAluraFlix" />
            </Link>
            <h2 className={styles.texto}>Developed by PHS-Informática</h2>
            <div className={styles.redes_sociais}>
                <a href="https://github.com/PHS-informatica" target="_blank" rel="noopener noreferrer" >
                    <IoLogoGithub className={styles.icone} alt="imagem github" />
                </a>
                <a href="https://www.linkedin.com/in/paulo-hds" target="_blank" rel="noopener noreferrer">
                    <IoLogoLinkedin className={styles.icone} alt="imagem linkedin" />
                </a>
                <a href="https://www.instagram.com/phsinformatica.tec/" target="_blank" rel="noopener noreferrer" >
                    <IoLogoInstagram className={styles.icone} alt="imagem instragram" />
                </a>
                <a href="https://phsinformatica.vercel.app/" target="_blank" rel="noopener noreferrer">
    <FaGlobe className={styles.icone} alt="imagem site" />
</a>
            </div>
        </footer>
    )
}

export default Rodape