import Formulario from '../../componentes/Formulario/index.jsx'
import styles from './NovoVideo.module.css'
import { useEffect, useState } from 'react'
import categorias from '../../json/categorias.json'
import { api } from '../../api.jsx'

function NovoVideo() {

    const [videos, setVideos] = useState([])

    useEffect(() => {
        fetch(api)
            .then(resposta => resposta.json())
            .then(dados => {
                setVideos(dados)
            })
    }, [])

    const adicionarNovoVideo = (novoVideo) => {
        const categoriaSelecionada = categorias.find(cat => cat.nome === novoVideo.categoria)
        const videoParaAdicionar = {
            ...novoVideo,
            cor: categoriaSelecionada ? categoriaSelecionada.cor : '#000000' // Define a cor da categoria
        }

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoParaAdicionar)
        })
        .then(resposta => resposta.json())
        .then(videoAdicionado => {
            if (videoAdicionado) {
                // Atualiza o estado apenas com a resposta da API
                setVideos((prevVideos) => [...prevVideos, videoAdicionado])
                alert('Vídeo cadastrado com sucesso!')
            }
        })
        .catch(error => {
            console.error('Erro ao adicionar vídeo:', error)
            alert('Erro no cadastro!')
        })
    }

    return (
        <Formulario
            className={styles.sessaoFormulario}
            aoCadastrar={adicionarNovoVideo}
            categorias={categorias.map((categoria) => categoria.nome)}
        />
    )
}

export default NovoVideo