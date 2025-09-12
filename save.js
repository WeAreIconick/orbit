import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, speed, gap } = attributes;
	return (
		<div
			{ ...useBlockProps.save() }
			style={ {
				width: 240,
				height: 240,
				position: 'relative',
				margin: '0 auto',
			} }
		>
			<div
				className="clockface-text-circle"
				style={ {
					width: '100%',
					height: '100%',
					position: 'relative',
				} }
			>
				<span
					className="clockface-text-animation"
					data-rotating-text={ text }
					data-rotating-speed={ speed }
					data-rotating-gap={ gap }
					style={ {
						display: 'block',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
						transformOrigin: '50% 50%'
					} }
				/>
			</div>
		</div>
	);
}