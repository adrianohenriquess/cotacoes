
const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const close = document.querySelector('#close');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const open = document.querySelector('#open');

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerText = 'Buscando ...'
    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado';
        return;
    }
    
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error){
                mainMessage.innerText = `Alguma coisa deu errado ${data.error.message} código de erro ${data.error.code}`;
            } else {
                mainMessage.innerText = `Ticker: ${data.symbol}`;
                open.innerText = `Abertura: U$ ${data.open}`;
                high.innerText = `Alta do dia: U$ ${data.high}`;
                low.innerText = `Baixa do dia: U$ ${data.low}`;
                close.innerText = `Preço de fechamento: U$ ${data.close}`;
            }
        });
    });
});