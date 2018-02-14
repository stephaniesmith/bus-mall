'use strict';

const poll = {
    product: [],
    pollsClicked: 0,
    options: document.getElementById('row'),
    start: function () {

        this.product.push (
            new Product ('bag', 'img/bag.jpg'),
            new Product ('banana', 'img/banana.jpg'),
            new Product ('bathroom', 'img/bathroom.jpg'),
            new Product ('boots', 'img/boots.jpg'),
            new Product ('brefast', 'img/breakfast.jpg'),
            new Product ('bubblegum', 'img/bubblegum.jpg'),
            new Product ('chair', 'img/chair.jpg'),
            new Product ('cthulhu', 'img/cthulhu.jpg'),
            new Product ('dog-duck', 'img/dog-duck.jpg'),
            new Product ('dragon', 'img/dragon.jpg'),
            new Product ('pen', 'img/pen.jpg'),
            new Product ('pet-sweep', 'img/pet-sweep.jpg'),
            new Product ('scissors', 'img/scissors.jpg'),
            new Product ('shark', 'img/shark.jpg'),
            new Product ('sweep', 'img/sweep.png'),
            new Product ('tauntaun', 'img/tauntaun.jpg'),
            new Product ('unicorn', 'img/unicorn.jpg'),
            new Product ('usb', 'img/usb.gif'),
            new Product ('water-can', 'img/water-can.jpg'),
            new Product ('wine-glass', 'img/wine-glass.jpg')
        );

        this.showProduct();

        this.options.addEventListener('click', clickHandler);
    },

    next: function () {
        if (this.pollsClicked < 25) {
            this.showProduct();
        } else {
            this.options.removeEventListener('click', clickHandler);
            const section = this.options;
            const p = document.createElement('p');
            p.textContent = 'GAME OVER';
            section.appendChild(p);

            this.drawChart();
        }
    },

    drawChart: function () {
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');

        const names = name();
        const clicks = score();

        console.log('names: ', names);
        console.log('clicks: ', clicks);

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

    getRandomProduct: function () {
        const selectedProduct = [];
        while (selectedProduct.length < 3) {
            const min = Math.ceil(0);
            const max = Math.floor(19);
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            const item = this.product[number];
            if (selectedProduct.includes(item)) continue;
            selectedProduct.push(item);
        }
        console.log(selectedProduct);
        return selectedProduct;
    },

    showProduct: function () {
        const img = this.getRandomProduct();
        const allDiv = document.querySelectorAll('div.item');

        for (let i = 0; i < allDiv.length; i++) {
            allDiv[i].appendChild(img[i].render());
        }
    },

    clear: function () {
        const allDiv = document.querySelectorAll('div.item');
        for (let i = 0; i < allDiv.length; i ++) {
            allDiv[i].textContent = '';
        }
    }
};

function score () {
    const count = [];
    for (let i = 0; i < poll.product.length; i++) {
        const item = poll.product[i];
        count.push(item.timesClicked);
    }
    return count;
};

function name () {
    const names = [];
    for (let i = 0; i < poll.product.length; i++) {
        const item = poll.product[i];
        names.push(item.name);
    }
    return names;
};

function clickHandler() {
    console.log('game was clicked', event.target);

    const url = event.target.src;
    for(let i = 0; i < poll.product.length; i++) {
        const selectedProduct = poll.product[i];

        console.log('index of url', url.indexOf(selectedProduct.filePath));
        const endOfUrl = url.slice(url.indexOf(selectedProduct.filePath), url.length);

        if (endOfUrl === selectedProduct.filePath) {
            selectedProduct.timesClicked++;
            console.table(selectedProduct);
        }
    }
    poll.pollsClicked++;
    console.log(poll.pollsClicked);
    poll.clear();
    poll.next();
};

function Product (name, filePath, timesShown, timesClicked) {
    this.name = name;
    this.filePath = filePath;
    this.timesShown = 0;
    this.timesClicked = 0;
};

Product.prototype.render = function () {
    const ele = document.createElement('img');
    ele.src = this.filePath;
    ele.setAttribute('alt', 'this.name');
    return ele;
};

poll.start();