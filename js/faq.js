// js/faq.js
function toggleAnswer(id) {
    const answer = document.getElementById(id);
    const question = answer.previousElementSibling;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        question.classList.remove('active');
    } else {
        answer.style.display = 'block';
        question.classList.add('active');
    }
}