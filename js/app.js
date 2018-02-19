'use strict';
const poll = {
    product: [],
    pollsClicked: 0,
    img: 3,
    rounds: 25,
    options: document.getElementById('row'),


    start: function () {
        this.getSettings();

        this.getProduct();

        this.showProduct();

        this.options.addEventListener('click', clickHandler);

    },

    getSettings: function () {
        if (localStorage.getItem('settings')) {
            const savedSettings = JSON.parse(localStorage.getItem('settings'));
            console.log('!!!!!!!!! ', savedSettings);

            this.img = parseInt(savedSettings.img);
            this.rounds = parseInt(savedSettings.rounds);
            console.log(this);
        }
    },

    getProduct: function () {
        if (localStorage.getItem('data')) {
            const storedData = JSON.parse(localStorage.getItem('data'));
            for (let i = 0; i < storedData.length; i++) {
                const products = new Product(storedData[i].name, storedData[i].filePath, storedData[i].timesClicked);
                this.product.push(products);
            }
        } else {
            this.product.push (
                new Product ('bag', 'img/bag.jpg', 0),
                new Product ('banana', 'img/banana.jpg', 0),
                new Product ('bathroom', 'img/bathroom.jpg', 0),
                new Product ('boots', 'img/boots.jpg', 0),
                new Product ('brefast', 'img/breakfast.jpg', 0),
                new Product ('bubblegum', 'img/bubblegum.jpg', 0),
                new Product ('chair', 'img/chair.jpg', 0),
                new Product ('cthulhu', 'img/cthulhu.jpg', 0),
                new Product ('dog-duck', 'img/dog-duck.jpg', 0),
                new Product ('dragon', 'img/dragon.jpg', 0),
                new Product ('pen', 'img/pen.jpg', 0),
                new Product ('pet-sweep', 'img/pet-sweep.jpg', 0),
                new Product ('scissors', 'img/scissors.jpg', 0),
                new Product ('shark', 'img/shark.jpg', 0),
                new Product ('sweep', 'img/sweep.png', 0),
                new Product ('tauntaun', 'img/tauntaun.jpg', 0),
                new Product ('unicorn', 'img/unicorn.jpg', 0),
                new Product ('usb', 'img/usb.gif', 0),
                new Product ('water-can', 'img/water-can.jpg', 0),
                new Product ('wine-glass', 'img/wine-glass.jpg', 0)
            );
        }
    },

    showProduct: function () {
        const randProd = this.getRandomProduct();
        // const allDiv = document.querySelectorAll('div.item');
        const section = document.getElementById('row');

        for (let i = 0; i < randProd.length; i++) {
            const div = document.createElement('div');
            div.id = 'item';
            section.appendChild(div);
            div.appendChild(randProd[i].render());
        }

        console.log('after start: ', poll.product);
    },

    getRandomProduct: function () {
        const selectedProduct = [];
        while (selectedProduct.length < this.img) {
            const min = Math.ceil(0);
            const max = Math.floor(19);
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            const item = this.product[number];
            if (selectedProduct.includes(item)) continue;
            selectedProduct.push(item);
        }
        // console.log(selectedProduct);
        return selectedProduct;
    },

    next: function () {
        if (this.pollsClicked < this.rounds) {
            this.showProduct();
        } else {
            this.options.removeEventListener('click', clickHandler);
            this.playAgain();

            // const p = document.querySelector('p');
            this.options.addEventListener('click', reStart);

            this.drawChart();

            localStorage.setItem('data', JSON.stringify(this.product));
        }
    },

    drawChart: function () {
        const showClass = document.getElementById('chart-holder');
        showClass.setAttribute('class', 'show');

        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');

        const names = [];
        const clicks = [];

        for (let i = 0; i < this.product.length; i++) {
            const item = this.product[i];
            clicks.push(item.timesClicked);
            names.push(item.name);
        }

        const chart = new Chart(chartCtx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: 'number of times picked',
                    data: clicks
                }]
            },
            options: {
                scales: {
                    yAxes: [{

                        ticks: {

                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    },

    clear: function () {
        for(let i = 0; i < this.img; i++) {
            const div = document.getElementById ('item');
            div.remove();
        };
    },

    playAgain: function () {
        const section = this.options;
        const p = document.createElement('p');
        p.id = 'playAgain';
        p.textContent = 'Play Again';
        section.appendChild(p);
    }
};

function clickHandler() {
    console.log('game was clicked', event.target);

    const url = event.target.src;
    for(let i = 0; i < poll.product.length; i++) {
        const selectedProduct = poll.product[i];

        // console.log('index of url', url.indexOf(selectedProduct.filePath));
        const endOfUrl = url.slice(url.indexOf(selectedProduct.filePath), url.length);

        if (endOfUrl === selectedProduct.filePath) {
            selectedProduct.timesClicked++;
        }
    }
    poll.pollsClicked++;
    console.log(poll.pollsClicked);
    poll.clear();
    poll.next();
};

function reStart () {
    const p = document.getElementById('playAgain');
    p.remove();
    poll.pollsClicked = 0;
    poll.product.length = 0;
    poll.options.removeEventListener('click', reStart);
    poll.start();
};

function Product (name, filePath, timesClicked) {
    this.name = name;
    this.filePath = filePath;
    this.timesClicked = timesClicked;
};

Product.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src = this.filePath;
    ele.setAttribute('alt', 'this.name');
    return ele;
};

poll.start();
