var toggle = false;

var self = require('sdk/self'),
	selection = require('sdk/selection');

var panel = require('sdk/panel').Panel({
	contentScript: "console.log(document.firstChild.innerHTML)",
	contentStyleFile: self.data.url('panel-xml.css')
});

var ui = require("sdk/ui");
var button = ui.ToggleButton({
	id: "my-button",
	label: "yenbo-dict off",
	icon: "./icon-red.png",
	onClick: function(state) {
		toggle = state.checked;
		this.label = "yenbo-dict " + (toggle ? 'on' : 'off');
		this.icon = './icon-' + (toggle ? 'green' : 'red') + '.png';
		console.log("You clicked '" + state.label + "'");
	}
});

selection.on('select', function () {
	if (toggle) {
		var text = selection.text;

		panel.contentURL = 'http://dict.youdao.com/fsearch?q=' + text.trim();
		panel.show();
	}
});