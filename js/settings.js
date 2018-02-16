const form = document.getElementById('form');
form.addEventListener('submit', function () {
    event.preventDefault();

    const img = this.img.value;
    const rounds = this.rounds.value;

    const settings = {img: img, rounds: rounds};
    localStorage.setItem('settings', JSON.stringify(settings));
});