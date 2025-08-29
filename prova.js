document.addEventListener('DOMContentLoaded', function() {
    
    // --- PARTE 1: LÓGICA DE SELEÇÃO DAS RESPOSTAS ---

    const questions = document.querySelectorAll('.test-paper');

    questions.forEach((question, index) => {
        // Lógica especial de clique para a Questão 3 (índice 2)
        if (index === 2) {
            const linesInQ3 = question.querySelectorAll('.option');
            linesInQ3.forEach(line => {
                const verbs = line.querySelectorAll('.verb-option');
                verbs.forEach(verb => {
                    verb.addEventListener('click', function() {
                        // Remove a classe 'selected' do outro verbo na mesma linha
                        verbs.forEach(v => v.classList.remove('selected'));
                        // Adiciona a classe 'selected' apenas no verbo que foi clicado
                        this.classList.add('selected');
                    });
                });
            });
        } 
        // Lógica de clique padrão para todas as outras questões
        else {
            const options = question.querySelectorAll('.option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    // Remove a classe 'selected' de todas as opções desta questão
                    options.forEach(opt => opt.classList.remove('selected'));
                    // Adiciona a classe 'selected' apenas na opção clicada
                    this.classList.add('selected');
                });
            });
        }
    });

    // --- PARTE 2: LÓGICA DE CORREÇÃO AO CLICAR EM "ENVIAR" ---

    const submitBtn = document.getElementById('submit-btn');
    const scoreDisplay = document.querySelector('.score-display');
    const gradeDisplay = document.querySelector('.grade-box .resultado');

    submitBtn.addEventListener('click', function() {
        let totalScore = 0;
        let isAllAnswered = true;

        // --- GABARITOS ---

        // Gabarito detalhado apenas para a Questão 3
        const correctAnswersQ3 = [
            "saw",        // Resposta para o item A
            "has worked", // Resposta para o item B
            "hasn't done",// Resposta para o item C
            "traveled",   // Resposta para o item D
            "lived"       // Resposta para o item E
        ];
        
        // Gabarito para as outras questões (índice da questão: "LETRA CORRETA")
        const otherCorrectAnswers = {
            0: "C", // Questão 1 (Corrigido para a opção gramaticalmente correta)
            1: "C", // Questão 2
            3: "C", // Questão 4
            4: "C", // Questão 5
            5: "C", // Questão 6
            6: "C", // Questão 7
            7: "C", // Questão 8
            8: "C", // Questão 9
            9: "C"  // Questão 10
        };

        // Loop para verificar cada questão
        questions.forEach((question, index) => {
            // Lógica de correção ESPECIAL para a Questão 3 (índice 2)
            if (index === 2) {
                const linesInQ3 = question.querySelectorAll('.option');
                let answeredLines = 0;
                linesInQ3.forEach((line, lineIndex) => {
                    const selectedVerb = line.querySelector('.verb-option.selected');
                    if (selectedVerb) {
                        answeredLines++;
                        // Compara o texto do verbo selecionado com o gabarito
                        if (selectedVerb.textContent.trim() === correctAnswersQ3[lineIndex]) {
                            totalScore += 0.2; // Adiciona 0.2 pontos por acerto
                        }
                    }
                });
                // Verifica se todos os 5 itens da Questão 3 foram respondidos
                if (answeredLines < 5) {
                    isAllAnswered = false;
                }
            } 
            // Lógica de correção PADRÃO para as outras questões
            else {
                const selectedOption = question.querySelector('.option.selected');
                if (!selectedOption) {
                    isAllAnswered = false;
                } else {
                    const selectedAnswer = selectedOption.dataset.answer;
                    if (selectedAnswer === otherCorrectAnswers[index]) {
                        totalScore += 1; // Adiciona 1 ponto por acerto
                    }
                }
            }
        });

        // Se alguma questão não foi respondida, mostra um alerta
        if (!isAllAnswered) {
            alert("Por favor, responda todas as questões e todos os itens antes de enviar!");
            return; // Interrompe a função aqui
        }

        // Arredonda a nota final para evitar problemas com casas decimais (ex: 7.999999)
        const finalScore = parseFloat(totalScore.toFixed(1));

        // Mostra o resultado final na tela
        scoreDisplay.textContent = `TOTAL SCORES: ${finalScore}/10`;
        gradeDisplay.textContent = finalScore;
        gradeDisplay.style.color = '#0055ff';
        gradeDisplay.classList.add('final-score');

        // Desabilita o botão para evitar reenvio
        this.disabled = true;
        this.style.opacity = 0.6;
        this.style.cursor = 'not-allowed';
    });
});