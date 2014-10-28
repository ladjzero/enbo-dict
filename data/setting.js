console.log('load setting.js');

self.port.on('lang', function (lang) {
	console.log('on lang', lang);
	$('button[value=' + lang + ']').addClass('active');
});

$('button').click(function (event) {
	$('button.active').removeClass('active');
	var lang = $(event.target).addClass('active').attr('value');
	console.log('emit setlang', lang);
	self.port.emit('setlang', lang);
});