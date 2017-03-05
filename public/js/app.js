var socket = io();

socket.on('connect', function () {
	console.log('connected to socket.io server!');
});

var vm = new Vue({
  	el: '#app',
  	data: {
  		msg: '',
  		msgs: []
  	},
  	mounted: function () {
  		socket.on('message', function (msg) {
  			var date = moment.utc(msg.date);
			this.msgs.push({msg: msg.text, date: date});
		}.bind(this));
  	},
  	methods: {
		sendMessage: function () {
			socket.emit('message', {
				text: this.msg
			});
			this.msg = '';
		}
  	}
})