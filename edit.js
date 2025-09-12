import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Panel } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

function polarToCartesian(cx, cy, r, angleDeg) {
	const angleRad = (angleDeg - 90) * Math.PI / 180.0;
	return {
		x: cx + r * Math.cos(angleRad),
		y: cy + r * Math.sin(angleRad)
	};
}

function CircularTextStatic({ text, gap }) {
	const chars = text && text.length ? text.split('') : [];
	const radius = 100; // px
	const svgW = 220, svgH = 220;
	const center = radius + 10; // Move everything right: margin-left
	const gapDeg = Number.isFinite(gap) ? Math.max(0, Math.min(gap, 180)) : 20;
	const n = chars.length;
	const arcDegrees = 360 - gapDeg;

	return (
		<svg
			width={ svgW }
			height={ svgH }
			className="clockface-text-static-preview"
			style={{ display: 'block', marginLeft: 0 }}
		>
			{chars.map((char, i) => {
				const charAngle = (arcDegrees / Math.max(1, n - 1)) * i + gapDeg/2;
				const pos = polarToCartesian(center, center, radius, charAngle);
				return (
					<text
						key={i}
						x={pos.x}
						y={pos.y}
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize="1.12rem"
						fill="currentColor"
						transform={`rotate(${charAngle},${pos.x},${pos.y})`}
						style={{ userSelect: 'text', pointerEvents: 'none' }}
					>{char}</text>
				);
			})}
		</svg>
	);
}

function TelexPanel() {
	return (
		<PanelBody
			title={__('Powered by Telex', 'orbit-block-wp')}
			initialOpen={false}
		>
			<p style={{ marginBottom: '0.6em' }}>
				Telex is basically the J.A.R.V.I.S of WordPress development - an AI that builds blocks so you don't have to.
			</p>
			<a
				href="https://telex.automattic.ai"
				target="_blank"
				rel="noopener noreferrer"
				style={{ display: 'inline-block', color: '#2271b1', textDecoration: 'underline' }}
			>
				Learn more about Telex
			</a>
		</PanelBody>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { text, speed, gap } = attributes;

	const onChangeText = ( value ) => setAttributes( { text: value } );
	const onChangeSpeed = ( value ) => setAttributes( { speed: value } );
	const onChangeGap = ( value ) => setAttributes( { gap: value } );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Orbit', 'orbit-block-wp' ) }
					description={ __( 'Launch your text into smooth, circular motion with Orbit.', 'orbit-block-wp' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __('Text to display', 'orbit-block-wp') }
						value={ text }
						onChange={ onChangeText }
						placeholder={ __('Code is Poetry since 2003', 'orbit-block-wp') }
					/>
					<RangeControl
						label={ __( 'Speed (degrees/sec)', 'orbit-block-wp' ) }
						value={ speed }
						onChange={ onChangeSpeed }
						min={ 1 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Gap (degrees between start and end)', 'orbit-block-wp' ) }
						value={ gap }
						onChange={ onChangeGap }
						min={ 0 }
						max={ 120 }
						step={ 1 }
						help={ __( 'Creates a space at the join of the circle. 0 = closed circle; higher = more visible gap.' ) }
					/>
				</PanelBody>
				<TelexPanel />
			</InspectorControls>

			<div { ...useBlockProps() } style={{ width: 220, height: 220, minWidth: 220, minHeight: 220, display: 'block', color: '#21509bcf' }}>
				<CircularTextStatic text={ text || 'Code is Poetry since 2003' } gap={ gap } />
			</div>
		</Fragment>
	);
}
