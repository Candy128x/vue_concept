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
			<div class="cart">
				<p>Cart({{cart}})</p>
			</div>

		</div>
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
		cart: 0,
	}
},

	methods: {
		addToCart: function(){ // Anonymous function
			this.cart += 1
		},

		updateProduct(index){
			this.selectedVariant = index
			console.log(index)
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


var app = new Vue({
	el: '#app',
	data: {
		premium: true
	}
})
