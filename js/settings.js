const form = document.getElementById('form');
form.addEventListener('submit', function () {
    event.preventDefault();

    const img = this.img.value;
    const rounds = this.rounds.value;

    const settings = {img: img, rounds: rounds};
    localStorage.setItem('settings', JSON.stringify(settings));

    alert('Your changes have been saved.');
});

const reset = document.getElementById('reset');
reset.addEventListener('click', function() {
    const confirmReset = confirm('Are you sure you want to reset the graph?');
    if (confirmReset) {
        localStorage.clear();
        poll.product.length = 0;

        const chart = document.getElementById('chart-holder');
        chart.setAttribute('class', 'hidden');
    };
});