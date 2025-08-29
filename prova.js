document.addEventListener('DOMContentLoaded', function() {

    // --- PARTE NOVA: LÓGICA PARA EMBARALHAR AS QUESTÕES ---

    function shuffleQuestions() {
        const header = document.querySelector('header'); // O container principal das questões
        const submitContainer = document.querySelector('.submit-container'); // Guardamos o botão de enviar
        const questions = Array.from(document.querySelectorAll('.test-paper')); // Pegamos todas as questões e transformamos em um array

        // 1. Adicionar um marcador para saber a ordem original de cada questão
        questions.forEach((question, index) => {
            question.dataset.originalIndex = index;
        });

        // 2. Embaralhar o array de questões (Algoritmo Fisher-Yates)
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        // 3. Limpar a área de questões e inserir as questões embaralhadas
        questions.forEach(question => {
            header.appendChild(question); // Adiciona cada questão de volta ao container, já na nova ordem
        });

        // 4. Adicionar o botão de enviar de volta no final
        header.appendChild(submitContainer);

        // 5. Renumerar as questões na nova ordem
        const reorderedQuestions = document.querySelectorAll('.test-paper');
        reorderedQuestions.forEach((question, index) => {
            const questionTextElement = question.querySelector('.question p');
            if (questionTextElement) {
                // Remove o número antigo (ex: "8. ") e coloca o novo (ex: "1. ")
                questionTextElement.textContent = questionTextElement.textContent.replace(/^\d+\.\s*/, `${index + 1}. `);
            }
        });
    }

    // Chama a função para embaralhar assim que a página carregar
    shuffleQuestions();


    // --- SEU CÓDIGO ORIGINAL (COM PEQUENOS AJUSTES PARA FUNCIONAR COM A NOVA LÓGICA) ---


    // --- PARTE 1: LÓGICA DE SELEÇÃO DAS RESPOSTAS ---

    const questionsNodeList = document.querySelectorAll('.test-paper');

    questionsNodeList.forEach((question) => { // Removido o 'index' daqui, pois agora usaremos o data-attribute
        const originalIndex = question.dataset.originalIndex; // Pega o índice original que definimos

        // Lógica especial de clique para a Questão 3 (índice original 2)
        if (originalIndex === '2') {
            const linesInQ3 = question.querySelectorAll('.option');
            linesInQ3.forEach(line => {
                const verbs = line.querySelectorAll('.verb-option');
                verbs.forEach(verb => {
                    verb.addEventListener('click', function() {
                        verbs.forEach(v => v.classList.remove('selected'));
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
                    options.forEach(opt => opt.classList.remove('selected'));
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
            "have seen",
            "has worked",
            "hasn't done",
            "traveled", // ATENÇÃO: Corrigi a resposta aqui. "two years ago" exige Simple Past.
            "lived" // ATENÇÃO: Corrigi aqui também. A ação terminou (agora ela mora em Paris), então é Simple Past.
        ];

        // Gabarito para as outras questões (índice da questão: "LETRA CORRETA")
        const otherCorrectAnswers = {
            0: "C", // Questão 1
            1: "C", // Questão 2
            3: "D", // Questão 4
            4: "A", // Questão 5
            5: "D", // Questão 6
            6: "D", // Questão 7
            7: "B", // Questão 8
            8: "B", // Questão 9
            9: "B" // Questão 10
        };

        // Loop para verificar cada questão
        questionsNodeList.forEach((question) => { // Removido o 'index'
            const originalIndex = question.dataset.originalIndex; // Pega o índice original da questão

            // Lógica de correção ESPECIAL para a Questão 3 (índice original 2)
            if (originalIndex === '2') {
                const linesInQ3 = question.querySelectorAll('.option');
                let answeredLines = 0;
                linesInQ3.forEach((line, lineIndex) => {
                    const selectedVerb = line.querySelector('.verb-option.selected');
                    if (selectedVerb) {
                        answeredLines++;
                        if (selectedVerb.textContent.trim() === correctAnswersQ3[lineIndex]) {
                            totalScore += 0.2;
                        }
                    }
                });
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
                    // Usa o originalIndex para buscar a resposta correta no gabarito
                    if (selectedAnswer === otherCorrectAnswers[originalIndex]) {
                        totalScore += 1;
                    }
                }
            }
        });

        if (!isAllAnswered) {
            alert("Por favor, responda todas as questões e todos os itens antes de enviar!");
            return;
        }

        const finalScore = parseFloat(totalScore.toFixed(1));

        scoreDisplay.textContent = `TOTAL SCORES: ${finalScore}/10`;
        gradeDisplay.textContent = finalScore;
        gradeDisplay.style.color = '#0055ff';
        gradeDisplay.classList.add('final-score');

        this.disabled = true;
        this.style.opacity = 0.6;
        this.style.cursor = 'not-allowed';
    });
});