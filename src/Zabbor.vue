<template>
<div id="app">
	<div id="map" style="width:100%; height: 800px;position:fixed;top:59px;" v-bind:class="{hidden: !showMap}"></div>
   <div class="container-fluid back">
      <div class="navbar">
         <div class="col">
            <button  v-on:click.prevent="toggleMap" type="button" class="btn btn-default back" aria-label="Left Align">
            <img src="/static/static/img/change.png" width="20" />
            </button>
         </div>
         <div class="col">
            <div id="logo"><img class="img-responsive center-block" src="/static/static/img/logo.png"></div>
         </div>
         <div class="col">
         </div>
      </div>
   </div>
   <div class="container-fluid back" v-if="error">
       Ошибка. Ну а что ты хотел, это хакатон
   </div>
   <div class="container-fluid back" v-else>
      <div v-if="!location">
         Пожалуйста, предоставьте доступ к геолокации
      </div>
      <div v-else>
      	<div v-if="!showMap">
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
                  <button class="btn btn-block login" style="font-size: 26px;" v-on:click.prevent="register">Войти</button>
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
                        <input type="text" style="width:50%;float:left;margin-top:20px;" class="input-group-text" v-model="thread_name" placeholder="Расскажи, что здесь происходит"></input>
                        <button  class="btn btn-lg" style="width:40%;float:right;margin-top:15px;" v-on:click.prevent="postThread">Отправить</button>	
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
                     <input type="text" style="width:50%;float:left;margin-top:20px;" class="input-group-text" v-model="message_text" placeholder="Сообщение"></input>
                     <button  class="btn btn-lg" style="width:40%;float:right;margin-top:15px;" v-on:click.prevent="sendMessage">Отправить</button>	
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
                           <span class="date">{{thread.created_at}}</span>
                        </div>
                     </div>
                     <div class='col' style="text-align:right;">
                        <div><a href="#" v-on:click.prevent="like(thread)"><img src="/static/static/img/plus.png" width="20" /> {{thread.likes}}</a></div>
                        <div><a href="#" v-on:click.prevent="dislike(thread)"><img src="/static/static/img/minus.png" width="20" /> {{thread.dislikes}}</a></div>
                     </div>
                  </div>
                  <div>{{thread.messages_amount}} сообщнений</div>
               </div>
            </div>
         </div>
         <div v-if="current_thread">
            <div class="row" style="height:50px;background:rgba(255,255,255,0.2);">
               <div class='row' style='height:7px;width:100%;'></div>
               <div class='row' style='width:100%;'>
                  <div class='col-2' style='padding:0px;padding-left:30px;'>
                  	<button href="#" class="btn-sm back" v-on:click.prevent="clearCurrentThread()">&lt;&nbsp;Назад</button>
                  </div>
                  <div class='col thread_messages' style='text-align:center'>{{current_thread.name}}</div>
               </div>
            </div>
            <div id="messages">
               <div class="message" v-for="message in current_thread.messages">
                  <div class="message_title row" style="width:100%;margin:0;padding:15px;">
                     <div style='width:100%;'>
                        <div class="name">{{message.user}}</div>
                        <span class="date">{{message.created_at}}</span>
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
</div>

    

</template>


<script>
'use strict';

function addCircleToMap(map){
  map.addObject(new H.map.Circle(
    // The central point of the circle
    {lat:55.7819515, lng:37.5992906},
    // The radius of the circle in meters
    50,
    {
      style: {
        strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
        lineWidth: 2,
        fillColor: 'rgba(0, 128, 0, 0.7)'  // Color of the circle
      }
    }
  ));
}


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
            scheme: 'http',
	    	host: 'localhost:8000',
			location: null,
			threads: [],
			current_thread: null,

			showMap: false, 

			map: null,
			real_location: null,

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
    	initializeMap: function() {
			/**
			 * Boilerplate map initialization code starts below:
			 */
			if (!document.getElementById('map') || this.map) {
				return
			}
			const lat = this.real_location.coords.latitude
			const lon = this.real_location.coords.longitude
			
			//Step 1: initialize communication with the platform
			const platform = new H.service.Platform({
			  app_id: 'eBByL2aGfruC4VB2wk21',
			  app_code: 'C3NOOCY1l-zIeYRasrqPSA'
			});
			const defaultLayers = platform.createDefaultLayers();
			//Step 2: initialize a map - this map is centered over New Delhi
			this.map = new H.Map(document.getElementById('map'),
			  defaultLayers.normal.map,{
			  center: {"lat":lat, "lng":lon},
			  zoom: 16
			});
			//Step 3: make the map interactive
			// MapEvents enables the event system
			// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
			const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
			// Create the default UI components
			const ui = H.ui.UI.createDefault(this.map, defaultLayers);
			
			// Now use the map as required...
			addCircleToMap(this.map);
    	},
    	toggleMap: function(){
    		this.showMap = !this.showMap
    	},

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
			this.real_location = location
		    this.location = String(location.coords.latitude) + "," + String(location.coords.longitude)
		    if (this.threads.length == 0) {
		    	this.getThreads()
		    }
		     if (!this.map) {
		    	this.initializeMap()
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
   #app {
		font-family: Jura, sans-serif;
	}
	
	.message {
		font-size: 16px;
		margin-top: 10px;
	}
	.thread {
		margin-top: 10px;
		border-top-color: #a5a5a5;
		font-size: 16px;
	}
	.thread_title {
		font-size: 20px;
	}
	.message_title {
		font-size: 18px;
	}
	.login {
		background: transparent;
	  	border-radius: 20px !important;
	  	border-color: white !important;
		}
	.date {
		font-size: 12px;
		opacity: 0.7;
		}
		
	.thread_messages {
		display: block;
		margin-bottom: 10px;
		}
	.back {
		border: none !important;
		background: transparent;
		}
		
	.hidden {
		z-index: -1!important;
		top: -1800px!important;
	}
		
	
	
</style>
