import { Link, useNavigate, useLocation } from 'react-router-dom'
import styles from './Cabecalho.module.css'
import logo from './logo.png'
import { GoHome } from "react-icons/go";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useState, useEffect } from 'react';
import { Botao } from '../Botao';

function Cabecalho() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleNovoVideoClick = () => {
        navigate('/addvideo');
    };

    const isHome = location.pathname === '/';
    const isNovoVideo = location.pathname === '/addvideo';

    return (
        <header className={styles.cabecalho}>
            <>
                <Link to="/">
                    <img className={styles.logo} src={logo} alt="LogoAluraFlix" />
                </Link>

                <nav className={styles.menu}>
                    {isMobile ? (
                        <>
                            <Botao
                                condition="true"
                                url="./"
                                className={`${styles.botaoHome} ${isHome ? styles.clicado : ''}`}
                                onClick={handleHomeClick}
                            >
                                <GoHome />
                                {!isNovoVideo && <span className={styles.descricao}>HOME</span>}
                            </Botao>
                            <Botao
                                condition="true"
                                url="./addvideo"
                                className={`${styles.botaoNovoVideo} ${isNovoVideo ? styles.clicado : ''}`}
                                onClick={handleNovoVideoClick}
                            >
                                <MdOutlineAddCircleOutline />
                                {isNovoVideo && <span className={styles.descricao}>NOVO VIDEO</span>}
                            </Botao>
                        </>
                    ) : (
                        <>
                            <Botao condition="true" url="./" className={`${styles.botao} ${isHome ? styles.clicado : ''}`}>
                                HOME
                            </Botao>
                            <Botao condition="true" url="./addvideo" className={`${styles.botao} ${isNovoVideo ? styles.clicado : ''}`}>
                                NOVO VIDEO
                            </Botao>
                        </>
                    )}
                </nav>
            </>
        </header>
    )
}

export default Cabecalho