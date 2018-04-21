<template>
	<div id="app">
		<div v-if="error">
			ERROR
		</div>
		<div v-else>
			<div v-if="!location">
				Please enable location
			</div>
			<div v-else>
				<div v-if="!user">
					Not logged in
					<textarea v-model="pwd" placeholder="Password"></textarea>
					<button v-on:click.prevent="register">Логин</button>	

					<div v-if="auth_error">
						{{auth_error}}
					</div>
				</div>
				<div v-if="user">
					<p>user: {{ user }}</p>
					<textarea v-model="thread_name" placeholder="Расскажите, что здесь происходит"></textarea>
					<button v-on:click.prevent="postThread">Запостить тред</button>	
					<button v-on:click.prevent="getThreads">Получить треды</button>	
					<button v-on:click.prevent="getUser">Getuser</button>	
					<p>Позиция {{location}} </p>
					<p> {{thread_name}} </p>
					<p> {{threads}} </p>

					<div v-if="!current_thread">
						<div id="threads">
						  <div class="thread" v-for="thread in threads">
						  	<a href='#' v-on:click.prevent="selectThread(thread)"><h4>{{thread.name}}</h4></a>
						  	<div><a href="#" v-on:click.prevent="like(thread)">Like {{thread.likes}}</a>, <a href="#" v-on:click.prevent="dislike(thread)">Dislike {{thread.dislikes}}</a></div>
						  	<div>Messages {{thread.messages_amount}}</div>
						  	<div>{{thread.created_at}}</div>
						  </div>
						</div>
					</div>
					<div v-if="current_thread">
						<div id="messages">
							<div class="message" v-for="message in current_thread.messages">
							  	<div>{{message.user}}  {{message.created_at}}</div>
							  	<p>{{message.text}}</p>
						    </div>
						</div>

						<div id="message_form">
							<input type="text" v-model="message_text" placeholder="Писать херню"></input>
							<button v-on:click.prevent="sendMessage">Пост</button>	
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
'use strict';

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

export default {
	name: 'app',
    components: {
    
    },
    data: function() {
        return {
	    	host: 'localhost:8000',
			location: null,
			threads: [],
			current_thread: null,

			user: null,
			pwd: null,
			auth_error: null,

			error: null,

			message_text: null,

		  }
    },
	computed: {
	    
    },
    methods: {
    	like: function(thread){
			this.$http.post(`http://${this.host}/thread/${thread.id}/like`, {
				"pwd": this.pwd
			})
			.then(response => {
				return this.getThreads()
			})
			.catch(this.handleError)
    	},
    	dislike: function(thread){
			this.$http.post(`http://${this.host}/thread/${thread.id}/dislike`, {
				"pwd": this.pwd
			})
			.then(response => {
				return this.getThreads()
			})
			.catch(this.handleError)
    	},
    	sendMessage: function(){
    		if (this.message_text) {
    			this.$http.post(`http://${this.host}/thread/${this.current_thread.id}`, {
    				"text": this.message_text,
    				"location": this.location,
    				"pwd": this.pwd
    			})
				.then(response => {
					return this.getThreadMessages(this.current_thread)
				})
				.catch(this.handleError)
    		}
    	},
    	getThreadMessages: function(thread){
    		this.$http.get(`http://${this.host}/thread/${thread.id}?location=${this.location}`)
			.then(response => {
				this.current_thread = response.body;
			})
			.catch(this.handleError)
    	},
    	selectThread: function(thread) {
    		this.current_thread = thread
    		console.log(this.current_thread)
    		this.getThreadMessages(thread)
    	},
		setUser: function (u) {
			setCookie('pwd', JSON.stringify(this.pwd))
			this.user = u
			//this.pwd = null
			this.auth_error = null
		},
		clearUser: function (error){
			this.user = null
			//this.pwd = null
			eraseCookie('pwd')
		},
    	login: function() {
    		if (!this.pwd) {
    			this.auth_error = 'Введите пароль'
    			return
    		}
    		console.log('logging in', this.pwd)
    		const password = this.pwd
    		this.$http.post(`http://${this.host}/auth`, {password: password})
    		.then(function(data){
    			return this.setUser(data.body)
    		})
    		.catch(this.handleError)
    	},
    	register: function() {
    		if (!this.pwd) {
    			this.auth_error = 'Введите пароль'
    			return
    		}
    		console.log('registering', this.pwd)
    		const password = this.pwd
    		this.$http.post(`http://${this.host}/register`, {password: password})
    		.then(function(data){
    			return this.setUser(data.body)
    		},
    		function(error) {
    			if (error.status == 409) {
    				return this.login()
    			}
    		})
    		.catch(this.handleError)
    	},
    	getUser: function() {
    		const cookie = JSON.parse(getCookie('pwd'))
    		if (cookie && !this.user){
    			this.pwd = cookie
    			this.login()
    		} else {
	    		this.$http.post(`http://${this.host}/whoami`, {"pwd": this.password})
	    		.then(function(data){
	    			return this.setUser(data.body)
	    		})
	    		.catch(this.handleError)
	    	}
    	},
    	handleError: function (error) {
    		console.error(error)
    		if (error.status == 401) {
				return this.clearUser()
			}
    		this.error = error
    	},
		updateLocation: function (location) {
			console.log(location)
		    this.location = String(location.coords.latitude) + "," + String(location.coords.longitude)
		    if (this.threads.length == 0) {
		    	this.getThreads()
		    }
	    },  
		postThread: function () {
			if (!this.location) {
				return
			}
		    this.$http.post(`http://${this.host}/thread`, {
			    name: this.thread_name,
			    location: this.location,
			    pwd: this.pwd
		    })
		    .then(function(response){
			    return this.selectThread(response.body)
		    })
		    .catch(this.handleError)
	    },
		getThreads: function () {
			if (!this.location) {
				return
			}
			this.$http.get(`http://${this.host}/thread?location=${this.location}`)
			.then(response => {
				this.threads = response.body;
			})
			.catch(this.handleError)
	    }
	},
    created: function () {
	    navigator.geolocation.watchPosition(this.updateLocation)
	    this.getUser()
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
