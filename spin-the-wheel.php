<?php

namespace AhnabShahin\SpinTheWheel\ROOT;

/**
 * Plugin Name:       Spin The Wheel
 * Description:       A customizable spin-the-wheel plugin for WordPress.
 * Version:           1.0.0
 * Author:            Your Name
 * License:           GPL-2.0-or-later
 * Text Domain:       spin-the-wheel
 */


if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';

stw_load_plugin_constants(__FILE__);
// stw_log('Spin The Wheel plugin initialized.');

new Plugin();
