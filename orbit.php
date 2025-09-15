<?php
/**
 * Plugin Name:       Orbit
 * Description:       Text that defies gravity. Words curve and glide along an invisible circular path, transforming static copy into kinetic art that draws the eye and holds attention.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:      	  iconick
 * Author URI:        https://iconick.io
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       orbit
 *
 * @package Orbit
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
if ( ! function_exists( 'telex_orbit_block_init' ) ) {
	function telex_orbit_block_init() {
		register_block_type( __DIR__ . '/build/' );
	}
}
add_action( 'init', 'telex_orbit_block_init' );