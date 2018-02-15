'use strict';

const poll = {
    product: [],
    pollsClicked: 0,
    options: document.getElementById('row'),
    start: function () {

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

        this.showProduct();

        this.options.addEventListener('click', clickHandler);
    },

    next: function () {
        if (this.pollsClicked < 25) {
            this.showProduct();
        } else {
            this.options.removeEventListener('click', clickHandler);
            playAgain();

            const p = document.querySelector('p');
            p.addEventListener('click', reStart);

            this.drawChart();

            localStorage.setItem('data', JSON.stringify(this.product));
        }
    },

    drawChart: function () {
        const chartCanvas = document.getElementById('chart');
        const chartCtx = chartCanvas.getContext('2d');

        const names = name();
        const clicks = score();


        // const count = [];
        // const names = [];

        // if (localStorage.getItem('data')) {
        //     const storedData = JSON.parse(localStorage.getItem('data'));
        //     for (let i = 0; i < storedData.length; i++) {
        //         count.push(this.product[i].timesClicked);
        //         names.push(this.product[i].name);
        //     }
        // } else {
        //     for (let i = 0; i < this.product.length; i++) {
        //         count.push(this.product[i].timesClicked);
        //         names.push(this.product[i].name);
        //     }
        // };


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
    },
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

function playAgain () {
    const section = poll.options;
    const p = document.createElement('p');
    p.textContent = 'Play Again';
    section.appendChild(p);
};

function reStart () {
    const p = document.querySelector('p');
    p.remove();
    poll.pollsClicked = 0;
    poll.product.length = 0;
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