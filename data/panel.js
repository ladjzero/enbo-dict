console.log('load panel.js');

$('span[title=日语发音]').remove();
$('span[id^=amw_panel_]').remove();
$('td[width=15px]').remove();
$('.jp_resultcount').remove();
$('a.gray').remove();
$('.jp_title_td_client').css('cursor', 'auto');

unsafeWindow._quickSkip = false;
unsafeWindow.ShiftVisible_jpcom = function (){};

self.port.on('show', function () {
	console.log('onshow');
	self.port.emit('height', $('body').height());
});