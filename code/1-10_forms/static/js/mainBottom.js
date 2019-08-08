Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
		<div class="product-image">
			<img v-bind:src="image" width="250px" height="250px">
		</div>
		
		<div class="product-info">
			<h1>{{ title }}</h1>

			<p v-if="10 < inStock">In Stock</p>
			<p v-else-if="0 < inStock && 10 >= inStock">Almost sold out</p>
			<p v-else>Out of Stock</p>

			<p>Only {{ inStock }} stocks left</p>

			<p>Shipping: {{ shipping }}</p>

			<h3>Price: $ {{ price }} only</h3>
			<p v-show="discount">Discount {{ discountAmmount }}%</p>

			<ul>
				<li v-for="detail in details">{{ detail }}</li>
			</ul>

			<br>

			<p>Available on colors:</p>
			<div 
				v-for="(variant, index) in variants" 
				:key="variant.variantId"
				class="color-box"
				:style="{ backgroundColor: variant.variantColor }"
				@mouseover="updateProduct(index)">
			</div>
			<br><br><br>

			<button 
				v-on:click="addToCart" 
				:disabled="!inStock"
				:class="{disabledBtn: !inStock}"
				>Add to Cart</button>

		</div>

		<div>
			<h2>Reviews</h2>
			<p v-if="!reviews.length">There are no reviews yet.</p>
			<ul>
				<li v-for="review in reviews">
				<p>{{ review.name }}</p>
				<p>Rating: {{ review.rating }}</p>
				<p>{{ review.review }}</p>
				</li>
			</ul>
		</div>

		<product-review @review-submitted="addReview"></product-review>
	</div>
	`,

	data() {
		return {
		// imgLink: '../assets/imgs/socks-green.png',
		selectedVariant: 0,
		product: 'Socks',
		brand: 'Addidas',
		discount: true,
		discountAmmount: 10,
		// inStock: true,
		// inventory: 12,
		price: 999,
		details: ["80% cotton", "20% polyester", "gender-netural"],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImg: "../../assets/imgs/socks-green.png",
				variantQuantity: 10,
			},
			{
				variantId: 2236,
				variantColor: "blue",
				variantImg: "../../assets/imgs/socks-blue.png",
				variantQuantity: 0
			}
			],
			reviews: []
	}
},

	methods: {
		addToCart: function(){ // Anonymous function
			this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
		},

		updateProduct(index){
			this.selectedVariant = index
			console.log(index)
		},

		addReview(productReview) {
			this.reviews.push(productReview)
		}
	},

	computed: {
		title() {
			return this.product + ' ' + this.brand
		},

		image() {
			return this.variants[this.selectedVariant].variantImg
		},

		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},


		shipping() {
			if (this.premium) {
				return "Free"
			} else {
				return "$ 3.99"
			}
		}
	}



})


Vue.component('product-review', {
	template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length" style="color:red;">
    	<b>Please correct the following error's!</b>
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
    
    </form>
	`,

	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: []
		}
	},

	methods: {
		onSubmit() {
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
				if(!this.name) this.errors.push("Name Required!")
				if(!this.review) this.errors.push("Review Required!")
				if(!this.rating) this.errors.push("Rating Required!")
			}
		}
	}
})


var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: [],
	},

	methods: {
		updateCart(id) {
			this.cart.push(id)
		}
	}
})
