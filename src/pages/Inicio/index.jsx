import { useEffect, useState } from "react"
import styles from './Inicio.module.css'
import Banner from '../../componentes/Banner'
import SessaoPorCategoria from "../../componentes/SessaoPorCategoria"
import ModalEditar from "../../componentes/ModalEditar"
import categorias from '../../json/categorias.json'
import { api } from "../../api"
import ModalPlay from "../../componentes/ModalPlay"

function Inicio() {

    const [videos, setVideos] = useState([])
    useEffect(() => {
        fetch(api)
            .then(resposta => resposta.json())
            .then(dados => {
                console.log('Dados recebidos:', dados) // Adicione este log
                setVideos(dados)
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error) // Adicione este log
            })
    }, [])

    function deletarVideo(id) {
        fetch(`${api}/${id}`, {
            method: 'DELETE'
        })
        .then(resposta => {
            if (resposta.ok) {
                setVideos(videos.filter(video => video.id !== id))
            } else {
                console.error('Erro ao deletar vídeo:', resposta.statusText)
            }
        })
        .catch(error => {
            console.error('Erro ao deletar vídeo:', error)
        })
    }

    function adicionarVideo(novoVideo) {
        const videoParaAdicionar = {
            titulo: novoVideo.titulo,
            imagem: novoVideo.imagem,
            link: novoVideo.link,
            categoria: novoVideo.categoria,
            descricao: novoVideo.descricao
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
            setVideos([...videos, videoAdicionado])
        })
        .catch(error => {
            console.error('Erro ao adicionar vídeo:', error)
        })
    }

    function atualizarVideo(videoAtualizado) {
        console.log('Atualizando vídeo:', videoAtualizado) // Adicione este log
        fetch(`${api}/${videoAtualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(videoAtualizado)
        })
        .then(resposta => resposta.json())
        .then(videoAtualizado => {
            console.log('Vídeo atualizado:', videoAtualizado) // Adicione este log
            setVideos(videos.map(video => {
                if (video.id === videoAtualizado.id) {
                    return videoAtualizado
                }
                return video
            }))
            setVideoSelecionado(null)
        })
        .catch(error => {
            console.error('Erro ao atualizar vídeo:', error)
        })
    }

    const [videoSelecionado, setVideoSelecionado] = useState(null)
    const [videoVer, setVideoVer] = useState(null)

    const editarVideo = (video) => {
        setVideoSelecionado(video)
    }

    const fecharModal = () => {
        setVideoSelecionado(null)
        setVideoVer(null)
    }

    const verVideo = (video) => {
        setVideoVer(video)
    }

    const [topoPagina, setTopoPagina] = useState(false)
    
    const irAoTopo = () => {
        setTopoPagina(true)
        window.scrollTo(0, 0)
    }

    return (
        <>
            <Banner 
                categoria={categorias}
                aoVerVideo={verVideo} 
            />
            <section className={styles.categorias}>
                {categorias.map((categoria, indice) => {
                    const videosFiltrados = videos.filter(video => video.categoria === categoria.nome)
                    console.log(`Categoria: ${categoria.nome}, Cor: ${categoria.cor}, Videos:`, videosFiltrados) // Adicione este log
                    return (
                        <SessaoPorCategoria
                            key={indice}
                            categoria={categoria}
                            videos={videosFiltrados}
                            aoDeletar={deletarVideo}
                            aoEditar={editarVideo}
                            aoVerVideo={verVideo}
                            aoTopo={irAoTopo}
                        />
                    )
                })}
            </section>
            <ModalEditar
                video={videoSelecionado}
                aoSalvar={atualizarVideo}
                aoFecharModal={fecharModal}
                categorias={categorias} // Passar a lista completa de categorias
            />
            <ModalPlay 
                video={videoVer}
                aoFecharModal={fecharModal} />
        </>
    )
}

export default Inicio