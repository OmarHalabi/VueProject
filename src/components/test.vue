<template>

	<div class="test">
		<input type="text" v-model="title"><br />
		<h1>{{title}}</h1>
		<p v-if="active">{{user.firstName}}</p>
		<p v-else>Nobody</p>
		<p v-text="user.lastName"></p>
		<ul>
			<li v-for="item in items">{{item.title}}</li>
		</ul>

		<button v-on:click="greet('hello omar')">Say Greeting</button>
		<br />
		<input type="text" v-on:keyup="pressedkey" v-on:keyup.enter="hitenter">

		<hr />
		<label>First Name:</label><input type="text" v-model="user.firstName">
		<br>
		<label>Last Name:</label><input type="text" v-model="user.lastName">

		<h3>{{fullName}}</h3>

		<h2>{{msg}}</h2>

	</div>



</template>



<script>
	export default {
		name: 'test',
		props: {
			msg: {
				type: String,
				default: 'Foobar'
			}
		},



		data () {

			return {
				title: 'Hello World',
				user: {
					firstName: 'omar',
					lastName: 'Hendi'
				},
				active: true,
				items: [
					{title: "one"},
					{title: "two"},
					{title: "three"}



				]
			}
		},

		methods: {
			greet: function(greet){
				//alert("Greeeeting !!!")
				alert(greet)
			},
			pressedkey: function(e){
				console.log(e.target.value)
			},
			hitenter: function(){
				console.log("you hit enter")
			}
		},

		computed: {
			fullName: function(){
				return this.user.firstName+' '+this.user.lastName;
			}
		}
	}
</script>



<style scoped>
</style>