document.addEventListener('DOMContentLoaded', function() {
    // 1. Lógica para selecionar apenas uma opção por questão
    const questionBlocks = document.querySelectorAll('.test-paper');

    questionBlocks.forEach(block => {
        const options = block.querySelectorAll('.option');

        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        });
    });

    // 2. Lógica para calcular e exibir a nota
    const submitBtn = document.getElementById('submit-btn');
    const scoreDisplay = document.querySelector('.score-display');
    const gradeDisplay = document.querySelector('.grade-box .resultado');

    // Define as respostas corretas (sempre a letra da opção)
    const correctAnswers = [
        "A", // Resposta correta para a questão 1
        "C", // Resposta correta para a questão 2
        "C", // Resposta correta para a questão 3
        "C", // Resposta correta para a questão 4
        "C"  // Resposta correta para a questão 5
    ];

    submitBtn.addEventListener('click', function() {
        let totalScore = 0;
        let isAllAnswered = true;
        const questions = document.querySelectorAll('.test-paper');
        
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('.option.selected');
            
            // Verifica se a questão foi respondida
            if (!selectedOption) {
                isAllAnswered = false;
                return;
            }

            // Pega a letra da opção selecionada (ex: "A", "B", etc.)
            const selectedAnswer = selectedOption.textContent.trim()[1];

            // Compara com a resposta correta
            if (selectedAnswer === correctAnswers[index]) {
                totalScore += 1; // Cada questão vale 2 pontos
            }
        });

        // Se alguma questão não foi respondida, avisa o usuário
        if (!isAllAnswered) {
            alert("Por favor, responda todas as questões antes de enviar!");
            return;
        }

        // Atualiza o texto com a nota final
        scoreDisplay.textContent = `TOTAL SCORES: ${totalScore}/10`;
        gradeDisplay.textContent = totalScore;

        // Muda a cor do texto "Resultado" para azul
        gradeDisplay.style.color = '#0055ff';

        // Adiciona a classe de estilo "caneta" para a nota
        gradeDisplay.classList.add('final-score');

        // Desabilita o botão para evitar reenvio
        this.disabled = true;
        this.style.opacity = 0.6;
        this.style.cursor = 'not-allowed';
    });
});