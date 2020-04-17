Vue.component('product-review', {
    template: `    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b> Please correct the following error(s): </b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>`,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if (!this.name) this.errors.push('Name required')
                if (!this.review) this.errors.push('Review required')
                if (!this.rating) this.errors.push('Rating required')
            }
        }
    }
})

Vue.component('product-detail', {
    props: {
        details: {
            type: Array,
            required: true,
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">
            {{ detail.param }}: {{ detail.value }}
        </li>
    </ul>
    `
})


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
        <a v-bind:href="link" target="_blank">More details</a>


        <product-detail :details="details"></product-detail>

        <button v-on:click="addToCart"> Add to cart</button>

        <div>
            <h2> Reviews </h2>
            <p v-if="!reviews.length" > There are no reviews yet. </p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>{{ review.review }}</p>
                    <p>Rating: {{ review.rating }}</p>
                </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>
    </div>
</div>`,
    data() {
        return {
            idx: 250,
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
            reviews: [],
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
            this.$emit('add-to-cart', this.idx)
        },
        updateImage(imageIndex) {
            this.activeImage = imageIndex
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
})


var app = new Vue({
    el: '#app',
    data: {
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})