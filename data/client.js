console.log('load client.js');

window.addEventListener('mouseup', function (){
	console.log('emit dict');
	self.port.emit('dict');
});