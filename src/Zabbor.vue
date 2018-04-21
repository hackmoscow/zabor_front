<template>
	<div id="app">
		<textarea v-model="thread_name" placeholder="Расскажите, что здесь происходит"></textarea>
		<button v-on:click.prevent="postThread">Запостить тред</button>	
		<p>Позиция {{position}} </p>
		<p> {{thread_name}} </p>
		<p> {{threads}} </p>
	</div>
</template>


<script>
export default {
	name: 'app',
    components: {
    
    },
    data: function() {
        return {
	    	host: 'localhost8000',
			position: null,
			threads: {
				name: "Пожар на улице Вязов",
				location: "10,10"
				},
			thread_name: "",
		  }
    },
	computed: {
	    
    },
/*
    methods: {
		updateLocation: function (position) {
		    this.position = String(position.coords.latitude) + "," + String(position.coords.longitude)
	    },  
		postThread: function () {
		    this.$http.post('/thread', {
			    name: this.thread_name,
			    location: this.position,
		    }).then(function(data){
			    console.log('abcd');
			    console.log(data);
		    }).catch(function(error) {
			    console.error(error)
		    })
	    },
		getThreads: function () {
			this.$http.get('/thread?location=').then(response => {
				this.threads = response.body;
			})
	    }
	},
*/
    created: function () {
	    navigator.geolocation.watchPosition(this.updateLocation)
    },
    watch: {
	   
    }
}
</script>
<style>
    p {
	    color: green;
	    padding: 10px;
	    border: 1px solid rgba(0, 0, 0, 0.91);
	    border-radius: 5px;
    }
</style>
