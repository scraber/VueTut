Vue.component('product', {
    template: `<div class="product">
    <div class="gallery-container">
        <div class="game-img">
            <img :src="currentImage" alt="">
        </div>
        <div class="thumbnails">
            <div v-for="(image, index) in  images"
                :class="['thumbnail-image', (activeImage == index) ? 'active' : '']"
                @mouseover="updateImage(index)">
                <img :src="image.thumb">
            </div>
        </div>
    </div>

    <div class="product-info">
        <h1> {{ productFullName }}</h1>
        <p v-show="inStock">Available</p>
        <a v-bind:href="link" target="_blank">Buy now</a>


        <ul>
            <li v-for="detail in details">
                {{ detail.param }}: {{ detail.value }}
            </li>
        </ul>

        <button v-on:click="addToCart"> Add to cart</button>

        <div class="cart">
            <p> Cart ({{ cart }})</p>
        </div>

    </div>
</div>`,
    data() {
        return {
            product: '7 Wonders',
            manufacturer: 'Rebel',
            images: [
                {
                    big: 'media/p1.jpg',
                    thumb: 'media/thumbs/p1.jpg'
                },
                {
                    big: 'media/p2.jpg',
                    thumb: 'media/thumbs/p2.jpg'
                },
                {
                    big: 'media/p3.jpg',
                    thumb: 'media/thumbs/p3.jpg'
                },
                {
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
        }
    },
    computed: {
        productFullName() {
            return this.product + ' by ' + this.manufacturer
        },
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


var app = new Vue({
    el: '#app',
})