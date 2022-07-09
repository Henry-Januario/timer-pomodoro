function iniciar() {
    let acao = document.getElementById('acao')
    let pausa = document.getElementById('pausa')
    let sessoes = document.getElementById('sessoes')

    const lofi = new Audio('./audio/lo-fi.mp3')
    const pause = document.getElementById('pause')

    const timer = document.getElementById('timer')
    const config = document.getElementById('config')


    if (acao.value == 0) {
        document.getElementById('erro_acao').innerText = "Adicione os minutos"
        acao.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro_pausa').innerText = "Adicione a pausa"
        acao.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro_sessoes').innerText = "Adicione as sessões"
        acao.focus()
    } else {
        pause.classList.replace('display-none', 'display-block')
        lofi.play()

        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        timer.classList.replace('display-none', 'd-flex')
        config.classList.replace('d-flex', 'display-none')
        instrucoes.classList.add('display-none')

        momentoAcao()
    }
}

function momentoAcao() {

    let sessoes_valor = localStorage.getItem('sessoes')

    if (sessoes_valor != "1") {
        document.getElementById('title_sessao').innerText = sessoes_valor + "sessões restantes"
    } else {
        document.getElementById('title_sessao').innerText = sessoes_valor + "sessão restante"
    }

    const title = document.querySelector('#title')
    title.innerText = 'AÇÃO'

    let min = Number(localStorage.getItem(acao))
    min = min - 1
    let segundos = 59

    document.querySelector("#minutes_ok").innerHTML = min
    document.querySelector("#seconds_ok").innerHTML = segundos

    min_interval = setInterval(minTimer, 60000)
    seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min = min - 1
        document.querySelector("#minutes_ok").innerText = min
    }

    function segTimer() {
        segundos = segundos - 1
        document.querySelector("#seconds").innerText = segundos

        if (segundos <= 0)
            if (min <= 0) {
                clearInterval('min_interval')
                clearInterval('seg_interval')

                const bell = new Audio("./audio/audio_bell.mp3")

                bell.play()

                momentoPausa()

            }
        segundos = 60
    }
}



function momentoPausa() {
    const title = document.querySelector('#title')
    title.innerText = 'PAUSA'
    title.style.setProperty('color', '#dc3545', 'important')

    let min_pausa = Number(localStorage.getItem(pausa))
    min_pausa = min_pausa - 1
    let segundos = 59

    document.querySelector("#minutes_ok").innerText = min_pausa
    document.querySelector("#seconds_ok").innerText = segundos

    min_interval = setInterval(minTimer, 60000)
    seg_interval = setInterval(segTimer, 1000)

    function minTimer() {
        min_pausa = min_pausa - 1
        document.querySelector('#minutes_ok').innerText = min_pausa
    }

    function segTimer() { }
    segundos = segundos - 1
    document.querySelector("#seconds").innerText = segundos

    if (segundos <= 0)
        if (min_pausa <= 0) {

            ses = Number(localStorage.getItem('sessoes'))
            ses = ses - 1
            localStorage.setItem('sessoes', String(ses))

            clearInterval('min_interval')
            clearInterval('seg_interval')

            if (ses <= 0) {

                const final = new Audio("./audio/audio_final.mp3")

                final.play()
                localStorage.clear()


                const timer = document.getElementById('timer')
                const config = document.getElementById('config')
                const fim = document.getElementById('fim')

                timer.classList.replace('d-flex', 'display-none')
                config.classList.replace('display-none', 'd-flex')
                fim.classList.replace('display-none', 'd-flex')
            } else{
                const volta = new Audio("./audio/audio_volta.mp3")
                momentoAcao()
                volta.play()

            }

        }

    segundos = 60
}