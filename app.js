'use strict';

const poll = {
    product: [],
    start: function () {

        this.product.push (
            new Product ('bag', 'img/bag.jpg'),
            new Product ('banana', 'img/banana.jpg'),
            new Product ('bathroom', 'img/bathroom'),
            new Product ('boots', 'img/boots.jpg'),
            new Product ('brefast', 'img/breakfast.jpg'),
            new Product ('bubblegum', 'img/bubblegum.jpg'),
            new Product ('chair', 'img/chair.jpg'),
            new Product ('cthulhu', 'img/cthulhu.jpg'),
            new Product ('dog-duck', 'img/dog-duck.jpg'),
            new Product ('dragon', 'img/dragon.jpg'),
            new Product ('pen', 'img/pen.jpg'),
            new Product ('pet-sweep', 'img/pet-sweep.jpg'),
            new Product ('scissors', 'img/sissors.jpg'),
            new Product ('shark', 'img/shark.jpg'),
            new Product ('sweep', 'img/sweep.png'),
            new Product ('tauntaun', 'img/tauntaun.jpg'),
            new Product ('unicorn', 'img/unicorn.jpg'),
            new Product ('usb', 'img/usb.gif'),
            new Product ('water-can', 'img/water-can.jpg'),
            new Product ('wine-glass', 'img/wine.glass.jpg')
        );

        this.showProduct();
    },

    getRandomProduct: function () {
        const selectedProduct = [];
        for (let i = 0; i < 3; i++) {
            const min = Math.ceil(0);
            const max = Math.floor(19);
            const number = Math.floor(Math.random() * (max - min + 1)) + min;
            const item = this.product[number];
            selectedProduct.push(item);
        }
        console.log(selectedProduct);
        return selectedProduct;
    },

    showProduct: function () {
        const products = this.getRandomProduct;
        
    }
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