'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initTooltips(elem) {
	$(elem).find('[data-toggle="tooltip"]').tooltip();
}

function destroyTooltips(elem) {
	$(elem).find('[data-toggle="tooltip"]').tooltip('destroy');
}

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		_lodash2.default.each(mutation.addedNodes, initTooltips);
		_lodash2.default.each(mutation.removedNodes, destroyTooltips);
	});
});

var config = { attributes: true, childList: true, subtree: true };

observer.observe(document.body, config);