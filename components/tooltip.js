import _ from 'lodash';

function initTooltips(elem) {
	$(elem).find('[data-toggle="tooltip"]').tooltip();
}

function destroyTooltips(elem) {
	$(elem).find('[data-toggle="tooltip"]').tooltip('destroy');
}

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		_.each(mutation.addedNodes, initTooltips);
		_.each(mutation.removedNodes, destroyTooltips);
	});
});

const config = { attributes: true, childList: true, subtree: true };

observer.observe(document.body, config);
