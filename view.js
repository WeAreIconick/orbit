
/**
 * This script is loaded both in the editor and on the front end.
 * It animates the sentence around a circle by absolutely positioning each character.
 */

function createCircularText($container, text, radius, startAngleDeg, animAngleDeg, gapDeg) {
	const characters = text.split('');
	const n = characters.length;
	const gap = typeof gapDeg === 'number' ? Math.max(0, Math.min(180, gapDeg)) : 0;
	const usedArcDeg = 360 - gap;

	while ($container.firstChild) {
		$container.removeChild($container.firstChild);
	}

	if (n === 0) return;
	for (let i = 0; i < n; i++) {
		const charElem = document.createElement('span');
		charElem.innerText = characters[i];
		charElem.style.position = 'absolute';
		charElem.style.left = '50%';
		charElem.style.top = '50%';
		const theta = (usedArcDeg / Math.max(1, n-1)) * i + startAngleDeg + animAngleDeg;
		charElem.style.transform = `rotate(${theta}deg) translate(${radius}px) rotate(90deg)`;
		charElem.style.transformOrigin = '0 0';
		charElem.style.whiteSpace = 'pre';
		$container.appendChild(charElem);
	}
}

function animateRotatingText(root, radius=100, speed=15, gap=20) {
	let angle = 0;
	let last = null;
	const $span = root;
	const text = $span.getAttribute('data-rotating-text');
	if (!text) return;
	const attrSpeed = parseFloat($span.getAttribute('data-rotating-speed'));
	const SPEED = (isFinite(attrSpeed) && attrSpeed > 0) ? attrSpeed : speed;
	const attrGap = parseFloat($span.getAttribute('data-rotating-gap'));
	const GAP = (isFinite(attrGap) && attrGap >= 0) ? attrGap : gap;

	function step(ts) {
		if (!last) last = ts;
		const delta = (ts - last)/1000;
		last = ts;
		angle = (angle + SPEED * delta) % 360;
		createCircularText($span, text, radius, 0, angle, GAP);
		requestAnimationFrame(step);
	}
	createCircularText($span, text, radius, 0, 0, GAP);
	requestAnimationFrame(step);
}

function mountRotatingTextBlocks() {
	const blocks = document.querySelectorAll('.clockface-text-animation[data-rotating-text]');
	for (let i = 0; i < blocks.length; i++) {
		if (!blocks[i].dataset.initialized) {
			blocks[i].dataset.initialized = "true";
			const speed = parseFloat(blocks[i].getAttribute('data-rotating-speed'));
			const gap = parseFloat(blocks[i].getAttribute('data-rotating-gap'));
			animateRotatingText(blocks[i], 100, speed, gap);
		}
	}
}

// For front-end and editor both
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', mountRotatingTextBlocks);
} else {
	mountRotatingTextBlocks();
}

// Also observe DOM for dynamically added blocks (for block editor)
const observer = new window.MutationObserver(() => {
	mountRotatingTextBlocks();
});
observer.observe(document.body, { childList: true, subtree: true });
