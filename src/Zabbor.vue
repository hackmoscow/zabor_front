<template>
<div id="app">
   <div class="container-fluid back">
      <div class="navbar">
         <div class="col">
            <button type="button" class="btn btn-default back" aria-label="Left Align">
            <img src="/static/static/img/change.png" width="20" />
            </button>
         </div>
         <div class="col">
            <div id="logo"><img class="img-responsive center-block" src="/static/static/img/logo.png"></div>
         </div>
         <div class="col">
            <button type="button" class="btn btn-default float-right" aria-label="Left Align">
            <img src="/static/static/img/filter.png" width="20" />	
            </button>
         </div>
      </div>
   </div>
   <div class="container-fluid back" v-if="error">
      Ну а что ты хотел, это хакатон
   </div>
   <div class="container-fluid back" v-else>
      <div v-if="!location">
         Please enable location
      </div>
      <div v-else>
         <div class="container zabor-back" v-if="!user" >
            <div style='width:100%;height:300px;'></div>
            <div class='row'>
               <div class="col">
               </div>
               <div class="col" style='text-align:center;'>
                  <input style="margin:auto;" type="text" class="input-group-text" v-model="pwd" placeholder="Password"></input>
               </div>
               <div class="col">
               </div>
            </div>
            <div style='width:100%;height:50px;'>
            </div>
            <div class="row" v-if="auth_error">
               <span style="margin:auto;text-align:center;color:red">{{auth_error}}</span>
            </div>
            <div style='width:100%;height:50px;'>
            </div>
            <div class='row' style="margin-bottom:50px;">
               <div class="col">
               </div>
               <div class="col" style='text-align:center;'>
                  <button class="btn btn-block" style="font-size: 26px;" v-on:click.prevent="register">Войти</button>
               </div>
               <div class="col">
               </div>
            </div>
            <div style='width:100%;height:50px;'>
            </div>
         </div>
         <div v-if="user">
            <div class="podbar back">
               <div v-if="!current_thread">
                  <div class="row">
                     <div class="col">
                     </div>
                     <div class="col-8" style="text-align:center">
                        <input type="text" style="width:50%;float:left;margin-top:4px;" class="input-group-text" v-model="thread_name" placeholder="Расскажи, что здесь происходит"></input>
                        <button  class="btn btn-lg" style="width:40%;float:right;" v-on:click.prevent="postThread">Отправить</button>	
                     </div>
                     <div class="col">
                     </div>
                  </div>
               </div>
               <div v-if="current_thread">
               	<div class="row">
                  <div class="col">
                  </div>
                  <div class="col-8" style="text-align:center">
                     <input type="text" style="width:50%;float:left;margin-top:4px;" class="input-group-text" v-model="message_text" placeholder="Сообщение"></input>
                     <button  class="btn btn-lg" style="width:40%;float:right;" v-on:click.prevent="sendMessage">Отправить</button>	
                  </div>
                  <div class="col">
                  </div>
              	</div>
               </div>
            </div>
         <div v-if="!current_thread">
            <div id="threads" class="container" >
               <div class="thread row" v-for="thread in threads">
                  <div class="thread_title row" style="width:100%;">
                     <div class='col-8'>
                        <div>
                           <a href='#' v-on:click.prevent="selectThread(thread)">
                              <h4>{{thread.name}}</h4>
                           </a>
                           <small>{{thread.created_at}}</small>
                        </div>
                     </div>
                     <div class='col' style="text-align:right;">
                        <div><a href="#" v-on:click.prevent="like(thread)">Like {{thread.likes}}</a></div>
                        <div><a href="#" v-on:click.prevent="dislike(thread)">Dislike {{thread.dislikes}}</a></div>
                     </div>
                  </div>
                  <div>{{thread.messages_amount}} messages</div>
               </div>
            </div>
         </div>
         <div v-if="current_thread">
            <div class="row" style="height:50px;background:rgba(255,255,255,0.2);">
               <div class='row' style='height:7px;width:100%;'></div>
               <div class='row' style='width:100%;'>
                  <div class='col-2' style='padding:0px;padding-left:30px;'>
                  	<button href="#" class="btn-sm" v-on:click.prevent="clearCurrentThread()">back</button>
                  </div>
                  <div class='col' style='text-align:center'>{{current_thread.name}}</div>
               </div>
            </div>
            <div id="messages">
               <div class="message" v-for="message in current_thread.messages">
                  <div class="message_title row" style="width:100%;margin:0;padding:15px;">
                     <div style='width:100%;'>
                        <div>{{message.user}}</div>
                        <small>{{message.created_at}}</small>
                     </div>
                     <div>
                        {{message.text}}
                     </div>
                  </div>
               </div>
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
            scheme: 'https',
	    	host: 'zabbor.net',
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
			this.$http.post(`${this.scheme}://${this.host}/thread/${thread.id}/like`, {
				"pwd": this.pwd
			})
			.then(response => {
				return this.getThreads()
			})
			.catch(this.handleError)
    	},
    	dislike: function(thread){
			this.$http.post(`${this.scheme}://${this.host}/thread/${thread.id}/dislike`, {
				"pwd": this.pwd
			})
			.then(response => {
				return this.getThreads()
			})
			.catch(this.handleError)
    	},
    	sendMessage: function(){
    		if (this.message_text) {
    			this.$http.post(`${this.scheme}://${this.host}/thread/${this.current_thread.id}`, {
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
    	clearCurrentThread: function(){
    		this.current_thread = null;
    		return this.getThreads();
    	},
    	getThreadMessages: function(thread){
    		this.$http.get(`${this.scheme}://${this.host}/thread/${thread.id}?location=${this.location}`)
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
    		this.$http.post(`${this.scheme}://${this.host}/auth`, {password: password})
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
    		this.$http.post(`${this.scheme}://${this.host}/register`, {password: password})
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

    		const cookie = getCookie('pwd') ? JSON.parse(getCookie('pwd')) : null
    		if (cookie && !this.user){
    			this.pwd = cookie
    			this.login()
    		} else {
	    		this.$http.post(`${this.scheme}://${this.host}/whoami`, {"pwd": this.password})
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
		    this.$http.post(`${this.scheme}://${this.host}/thread`, {
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
			this.$http.get(`${this.scheme}://${this.host}/thread?location=${this.location}`)
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
	@font-face {
    font-family: Jura; /* Имя шрифта */
    src: url(https://fonts.googleapis.com/css?family=Jura:400,600&amp;subset=cyrillic-ext); /* Путь к файлу со шрифтом */
   }
   #app {
		font-family: Jura, sans-serif;
	}
	
	.message {
		font-size: 16px;
	}
	.thread {
		padding-top: 10px;
		border-top-color: #a5a5a5;
		font-size: 16px;
	}
	.thread_title {
		font-size: 20px;
	}
	.message_title {
		font-size: 18px;
	}
	
	
	
</style>
