var app = new Vue({
    el: '#app',
    data: {
        product: '7 Wonders',
        images: [
            {
                id: '1',
                big: 'media/p1.jpg',
                thumb: 'media/thumbs/p1.jpg'
            },
            {
                id: '2',
                big: 'media/p2.jpg',
                thumb: 'media/thumbs/p2.jpg'
            },
            {
                id: '3',
                big: 'media/p3.jpg',
                thumb: 'media/thumbs/p3.jpg'
            },
            {
                id: '4',
                big: 'media/p4.jpg',
                thumb: 'media/thumbs/p4.jpg'
            }
        ],
        activeImage: 0,
        link: 'https://www.rebel.pl/product.php/1,302/19537/7-Cudow-Swiata.html',
        inStock: true,
        details: [
            { param: 'Players count', value: '2 - 7' },
            { param: 'Age', value: '10 yr+' },
            { param: 'Average time', value: '30 mins' }
        ],
        cart: 0,
    },
    computed: {
        currentImage() {
            return this.images[this.activeImage].big;
        }
    },
    methods: {
        addToCart() {
            if (this.inStock === true) {
                this.cart += 1
            }
        },
        updateImage(imageIndex) {
            this.activeImage = imageIndex
        },
    },
})