// Adiciona um ouvinte de eventos que roda quando o conteúdo HTML da página é totalmente carregado.
document.addEventListener('DOMContentLoaded', function() {
    // Encontra todos os blocos de questões.
    const questionBlocks = document.querySelectorAll('.test-paper');

    // Itera sobre cada bloco de questão encontrado.
    questionBlocks.forEach(block => {
        // Dentro de cada bloco, encontra todas as opções de resposta.
        const options = block.querySelectorAll('.option');

        // Itera sobre cada opção de resposta.
        options.forEach(option => {
            // Adiciona um ouvinte de evento de 'click' para cada opção.
            option.addEventListener('click', function() {
                // Quando uma opção é clicada:

                // 1. Remove a classe 'selected' de TODAS as opções dentro do mesmo bloco de questão.
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });

                // 2. Adiciona a classe 'selected' APENAS na opção que foi clicada.
                this.classList.add('selected');
            });
        });
    });
});