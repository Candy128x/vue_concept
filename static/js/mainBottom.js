var app = new Vue({
	el: '#app',
	data: {
		imgLink: '../assets/imgs/socks-green.png',
		product: 'Socks',
		brand: 'Addidas',
		discount: true,
		discountAmmount: 10,
		inStock: true,
		inventory: 12,
		price: 999,
		details: ["80% cotton", "20% polyester", "gender-netural"],
		variants: [
			{
				variantId: 2234,
				variantColor: "green",
				variantImg: "../assets/imgs/socks-green.png",
			},
			{
				variantId: 2236,
				variantColor: "blue",
				variantImg: "../assets/imgs/socks-blue.png",
			}
			],
		cart: 0,
	},

	methods: {
		addToCart: function(){ // Anonymous function
			this.cart += 1
		},

		updateProduct(variantImg){
			this.imgLink = variantImg
		}
	},

	computed: {
		title() {
			return this.product + ' ' + this.brand
		}
	}

})