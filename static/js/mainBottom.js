var app = new Vue({
	el: '#app',
	data: {
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
				variantImg: "../assets/imgs/socks-green.png",
				variantQuantity: 10,
			},
			{
				variantId: 2236,
				variantColor: "blue",
				variantImg: "../assets/imgs/socks-blue.png",
				variantQuantity: 0
			}
			],
		cart: 0,
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
		}
	}

})