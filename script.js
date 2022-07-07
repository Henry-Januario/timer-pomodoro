function iniciar(){
    let acao = document.getElementById('acao')
    let pausa = document.getElementById('pausa')
    let sessoes = document.getElementById('sessoes')

    const bell = new Audio("./audio/audio_bell.mp3")
    const volta = new Audio("./audio/audio_volta.mp3")
    const final = new Audio("./audio/audio_final.mp3")

    const lofi = new Audio('./audio/lo-fi.mp3')
    const pause = document.getElementById('pause')


    if(acao.value == 0){
        document.getElementById('erro_acao').innerText= "Adicione os minutos"
        acao.focus()
    } else if(pausa.value == 0){
        document.getElementById('erro_pausa').innerText= "Adicione a pausa"
        acao.focus()
    }else if(sessoes.value == 0){
        document.getElementById('erro_sessoes').innerText= "Adicione as sessões"
        acao.focus()
    }else {
        pause.classList.replace('display-none', 'display-block')
        lofi.play()
    }
}