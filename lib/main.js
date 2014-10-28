var _ = require('underscore'),
	{MenuButton} = require('./menu-button'),
	{PageMod} = require('sdk/page-mod'),
	{Panel} = require('sdk/panel'),
	self = require('sdk/self'),
	selection = require('sdk/selection'),
	ss = require('sdk/simple-storage');

var toggle = !!ss.storage.toggle,
	lang = ss.storage.lang || 'en',
	dicts = {
		en: 'http://dict.youdao.com/fsearch?q=-keyword-',
		jp: 'http://dict.hjenglish.com/client/jp/-keyword-'
	};

var dictPanel = Panel({
		contentScriptFile: ['jquery.js', 'panel.js'].map(self.data.url),
		contentStyleFile: self.data.url('panel-xml.css')
	}),
	settingPanel = Panel({
		contentURL: self.data.url('setting.html'),
		contentScriptFile: ['jquery.js', 'setting.js'].map(self.data.url),
		contentStyleFile: self.data.url('bootstrap.css'),
		width: 180,
		height: 55
	}),
	btn = MenuButton({
		id: 'my-menu-button',
		label: 'My menu-button',
		icon: "./icon-red.png",
		onClick: function (state, isMenu) {
			if (isMenu) {
				settingPanel.show({position: this});
			} else {
				ss.storage.toggle = toggle = !toggle;
				this.label = toggle ? 'on' : 'off';
				this.icon = './icon-' + (toggle ? 'green' : 'red') + '.png';
				console.log('click', toggle);
			}
		}
	});

PageMod({
	include: '*',
	contentScriptFile: self.data.url('client.js'),
	contentScriptWhen: 'start',
	onAttach: function (worker) {
		worker.port.on('dict', function () {
			if (toggle) {
				var text = selection.text;

				if (text) {
					dictPanel.contentURL = dicts[lang].replace('-keyword-', text.trim());
					dictPanel.show();
				}
			}
		});
	}
});

dictPanel.port
	.on('height', function (height) {
		console.log('on height', height);
		dictPanel.resize(dictPanel.width, height < 240 ? height : 240);
	});

settingPanel.on('show', function () {
	console.log('emit lang', lang);
	this.port.emit('lang', lang);
});

settingPanel.port.on('setlang', function (_lang) {
	console.log('on lang', _lang);
	ss.storage.lang = lang = _lang;
});
