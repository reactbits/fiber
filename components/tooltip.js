// import _ from 'lodash';

$(() => {
	initTooltips('body');
});

function initTooltips(elem) {
	$(elem).find('[data-toggle="tooltip"]').tooltip();
}

// function destroyTooltips(elem) {
// 	$(elem).find('[data-toggle="tooltip"]').tooltip('destroy');
// }
//
// const observer = new MutationObserver((mutations) => {
// 	mutations.forEach((mutation) => {
// 		_.forEach(mutation.addedNodes, initTooltips);
// 		_.forEach(mutation.removedNodes, destroyTooltips);
// 	});
// });
//
// const config = { attributes: true, childList: true, subtree: true };
//
// observer.observe(document.body, config);
