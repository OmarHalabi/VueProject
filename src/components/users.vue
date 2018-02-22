<template>

	<div class="center">

		<h1>SEEK ASIA</h1>
		<div class="input-group" style="margin: auto;"> 
			<span class="input-group-addon">Login As: <i class="glyphicon glyphicon-user"></i></span>
			<select class="form-control" v-model="co_selected">
				<option v-for="company in companies" v-bind:value="company" v-on:click="clear()">{{company.name}}</option>
			</select>
		</div>
		<br>
		<br>
		<br>

		
		
		<div class="row">
			<div class="col-xs-6">
				<form v-on:submit="addreq">
				<div class='well'>
					<br>
					Choose Type: 
					<select class="form-control" v-model="selected"> 
						<option v-for="ad in ads" v-bind:value="ad" v-on:click="checkOffer(selected.name,co_selected.name)">{{ad.name}}</option>
					</select>
					<br>
					<label >Price:  {{selected.price}}</label> <label >{{hint2}}</label>
					<br>
					<br>
					<input type="submit" value="Add" class="btn btn-primary" v-on:click="addcost(selected.price,selected.name,co_selected.name)">
					<br>
					<br>
				</div>
				</form>
			</div>
			<div class="col-xs-6">
				<div class="result">
					<div class="well">

						<label style="color: #b30000">  Total Price:  {{total}}</label>

						<ul>
							<li v-for="ad in newreq">
								<button  class="btn" v-on:click="deletead(ad)">x</button>
								{{ad.ad_type}}
								{{ad.ad_price}}
								{{ad.ad_hint}}
								
							</li>
						</ul>
					</div>
				</div>	
			</div>
		</div>
	</div>

</template>



<script>

	//import login from './components/login.vue';
	export default {

		name: 'users',

		// components: {
		// 	login
		// },

		data () {

			return {
				picked:'',
				hint:'',
				hint2:'',
				total: 0,
				disprice: 0,
				offerFlag: false,
				offerFlag2: false,
				offerFlag3: false,
				flagAlert: false,
				selected: '',
				co_selected: '',
				newreq: [],
				companies: [
					{
						name: 'Unilever'
					},
					{
						name: 'Apple'
					},
					{
						name: 'Nike'
					},
					{
						name: 'Ford'
					}


				],

				ads: [
					{
						name: 'Classic',
						price: 269.99
					},
					{
						name: 'Standout',
						price: 322.99

					},
					{
						name: 'Premium',
						price: 394.99
					}


				],
				
				disOffers: [
					{
						off_type: 'Discount',
						ad_type: 'Standout',
						for_co: 'Apple',
						new_price: 299.99
					},
					{
						off_type: 'Discount',
						ad_type: 'Standout',
						for_co: 'Ford',
						new_price: 309.99
					},
				],

				dealOffers: [

					{
						for_co: 'Unilever',
						ad_type: 'Classic',
						target:2,
						reward:1

					},
					{
						for_co: 'Ford',
						ad_type: 'Classic',
						target:4,
						reward:1

					}

				],
				dealDrop:[{
					for_co: 'Nike',
					ad_type: 'Premium',
					target:4,
					discountTo:379.99
				},
				{
					for_co: 'Ford',
					ad_type: 'Premium',
					target:3,
					discountTo:389.99
				}
				]
			}
		},

		methods: {
			addreq: function(e){

				if (this.flagAlert==true){
					return;
				}
				if(this.offerFlag == true){
				this.newreq.push({
					ad_type: this.selected.name,
					ad_price: this.disprice,
					ad_hint: this.hint
					
				});
				this.offerFlag = false;
			}

				else if (this.offerFlag2 == true){
					this.newreq.push({
						ad_type: this.selected.name,
						ad_price: this.disprice,
						ad_hint: this.hint

					});
					this.offerFlag2 = false;
				}

				else if (this.offerFlag3 == true){
					this.newreq.push({
						ad_type: this.selected.name,
						ad_price: this.disprice,
						ad_hint: this.hint
					});
					this.offerFlag3 = false;
				}

				else {
					this.newreq.push({
						ad_type: this.selected.name,
						ad_price: this.disprice,
						ad_hint: this.hint

						
					});
				}

					e.preventDefault();
					this.calcTotal();
			},		

			addcost: function(price,type,co){

				if(this.checkInfo()){

					return;
				}


				var result = this.numOfReqAds(type);
				console.log(result);

				// Check for deal
				 for (var i = 0; i < this.dealOffers.length; i++) {
					if (this.dealOffers[i].for_co == co && this.dealOffers[i].ad_type == type ){

						this.offerFlag2 = true;
						var target = this.dealOffers[i].target;
						var reward = this.dealOffers[i].reward;
						var sum = target+reward;

						var sec3 = result%sum;
						if(sec3 == target && result>0){
						this.disprice = 0;
						this.hint = 'free ad';
						console.log('free ad');
						return;
						}

						console.log('There is deal offer');
						

					}
				 }


				 // Check for discount
				 for (var i = 0; i < this.disOffers.length; i++) {
					if(this.disOffers[i].for_co == co && this.disOffers[i].ad_type == type ){
						this.offerFlag = true;
						this.disprice = this.disOffers[i].new_price;
						this.hint = 'discounted';
						console.log('discounted');
						return;
				 	}
				  }

				  for (var i = 0; i < this.dealDrop.length; i++) {
				  	if (this.dealDrop[i].for_co == co && this.dealDrop[i].ad_type == type && result+1 >= this.dealDrop[i].target) {
				  		this.offerFlag3 = true;
				  		this.disprice = this.dealDrop[i].discountTo;
				  		this.hint = 'discounted';
				  		return;

				  	}
				  }


					console.log('No offer');
					this.hint = '';
				   	this.disprice = price;
				   	

			},

			calcTotal: function(){
				var temp =0;
				for (var i = 0; i < this.newreq.length; i++) {
					temp += this.newreq[i].ad_price;
				}
				temp = temp.toFixed(2);
				this.total = temp;

			},

			numOfReqAds: function(anAd){
				var count=0;
				for (var i = 0; i < this.newreq.length; i++) {
					if (this.newreq[i].ad_type == anAd) {
						count = count+1;
					}
				}
				return count;

			},

			deletead: function(ad){
				this.newreq.splice(this.newreq.indexOf(ad),1);
				
				this.total = this.total - ad.ad_price;
				this.total = this.total.toFixed(2);
			
			},

			clear: function(){
				this.newreq=[];
				this.total=0;
				this.hint2='';
				this.selected='';
			},

			checkOffer: function(type,co){
				for (var i = 0; i < this.dealOffers.length; i++) {
					if (this.dealOffers[i].for_co == co && this.dealOffers[i].ad_type == type ){
						this.hint2= ', Buy '+this.dealOffers[i].target+' to get '+this.dealOffers[i].reward+' for free';
						return;
					}

				}
				for (var i = 0; i < this.disOffers.length; i++)
				{
					if(this.disOffers[i].for_co == co && this.disOffers[i].ad_type == type)
					{
						this.hint2= ', Discount to  '+this.disOffers[i].new_price;
						return;					
					}
				}
				for (var i = 0; i < this.dealDrop.length; i++)
				{
					if(this.dealDrop[i].for_co == co && this.dealDrop[i].ad_type == type)
					{
						this.hint2= ', Buy '+this.dealDrop[i].target+' or more to get Discount to '+this.dealDrop[i].discountTo;
						return;					
					}

				}

					
						this.hint2 = '';
			},

			checkInfo: function(){
				if(this.selected == '' || this.co_selected == ''){
					this.flagAlert = true;
					alert('You must login and choose Ad type');
				}
				else{
					this.flagAlert=false;
				}
			}

		}

		

	}

</script>

<style scoped>

.form-control{
	width: 120px;
}


 .contacted{
 	text-decoration: line-through;
 }
 .center {
    margin: auto;
    width: 70%;
    border:2px solid lightgray;
    padding: 10px;

}
.input-group{
    margin: auto;
    width: 20%;
    padding: 10px;
}
.result{
	text-align: left;
}
</style>