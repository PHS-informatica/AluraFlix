import styles from './ModalEditar.module.css'
import CampoFormulario from '../CampoFormulario'
import Textarea from '../Textarea'
import { BotaoFormulario } from '../Botao'
import ListaSuspensa from '../ListaSuspensa'
import { useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md"

function ModalEditar({ video, aoFecharModal, aoSalvar, categorias }) {

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [link, setLink] = useState('')
    const [imagem, setImagem] = useState('')
    const [categoria, setCategoria] = useState('')
    const [cor, setCor] = useState('') // Adicionado estado para a cor da categoria
    const [id, setId] = useState('')

    useEffect(() => {
        if (video) {
            setTitulo(video.titulo)
            setDescricao(video.descricao)
            setLink(video.link)
            setImagem(video.imagem)
            setCategoria(video.categoria)
            const categoriaSelecionada = categorias.find(cat => cat.nome === video.categoria)
            if (categoriaSelecionada) {
                setCor(categoriaSelecionada.cor)
            } else {
                setCor('')
            }
            setId(video.id)
        } else {
            setTitulo('')
            setDescricao('')
            setLink('')
            setImagem('')
            setCategoria('')
            setCor('')
            setId('')
        }
    }, [video, categorias])

    const handleCategoriaChange = (valor) => {
        setCategoria(valor)
        console.log('Categorias disponíveis:', categorias) // Adicione este log
        const categoriaSelecionada = categorias.find(cat => cat.nome === valor)
        if (categoriaSelecionada) {
            setCor(categoriaSelecionada.cor)
        } else {
            setCor('')
        }
        console.log('Categoria selecionada:', categoriaSelecionada) // Adicione este log
    }

    const submit = (event) => {
        event.preventDefault()
        console.log('Cor selecionada antes de salvar:', cor) // Adicione este log
        const videoAtualizado = {
            id,
            titulo,
            descricao,
            link,
            imagem,
            categoria,
            cor // Inclui a cor no objeto de vídeo atualizado
        }
        console.log('Video atualizado no submit:', videoAtualizado) // Adicione este log
        aoSalvar(videoAtualizado)
        aoFecharModal()
    }

    const handleReset = () => {
        setTitulo('')
        setDescricao('')
        setLink('')
        setImagem('')
        setCategoria('')
        setCor('')
        setId('')
    }

    return (
        <>
            {video && <>
                <div className={styles.overlay} />
                <dialog open={!!video} className={styles.modal}>
                    <MdOutlineCancel onClick={aoFecharModal} className={styles.iconeFechar} />
                    <h1>Editar card</h1>
                    <form onSubmit={submit} onReset={handleReset} method="dialog">
                        <div className={styles.sessaoCampos}>
                            <div className={styles.campos}>
                                <CampoFormulario
                                    className={styles.campoModal}
                                    obrigatorio={true}
                                    label="Título"
                                    placeholder="Insira o título"
                                    valor={titulo}
                                    aoAlterado={valor => setTitulo(valor)}
                                />

                                <ListaSuspensa
                                    obrigatorio={true}
                                    label="Categoria"
                                    placeholder="Selecione uma categoria..."
                                    itens={categorias.map(cat => cat.nome)} // Passar nomes das categorias
                                    valor={categoria}
                                    aoAlterado={handleCategoriaChange}
                                />

                                <CampoFormulario
                                    obrigatorio={true}
                                    label="Imagem"
                                    placeholder="URL da imagem"
                                    valor={imagem}
                                    aoAlterado={valor => setImagem(valor)}
                                />

                                <CampoFormulario
                                    obrigatorio={true}
                                    label="Vídeo"
                                    placeholder="URL do vídeo"
                                    valor={link}
                                    aoAlterado={valor => setLink(valor)}
                                />

                                <Textarea
                                    className={styles.textarea}
                                    obrigatorio={true}
                                    label="Descrição"
                                    placeholder="Sobre o que é esse vídeo?"
                                    valor={descricao}
                                    aoAlterado={valor => setDescricao(valor)}
                                />

                            </div>
                            <div className={styles.botoes}>
                                <BotaoFormulario
                                    children="Guardar"
                                    type='submit'
                                />
                                <BotaoFormulario
                                    children="Limpar"
                                    type='reset'
                                />
                            </div>
                        </div>
                    </form>
                </dialog>
            </>}
        </>
    )
}

export default ModalEditar