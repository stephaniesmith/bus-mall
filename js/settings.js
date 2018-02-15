const form = document.getElementById('form');
form.addEventListener('submit', function () {
    event.preventDefault();

    const img = this.img.value;
    const rounds = this.rounds.value;
    console.log(img, rounds);
});