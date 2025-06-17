<?php

namespace AhnabShahin\SpinTheWheel\ROOT;

use AhnabShahin\SpinTheWheel\System\Menu;
use AhnabShahin\SpinTheWheel\System\Enqueue;
use AhnabShahin\SpinTheWheel\System\RestAPI;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Plugin
{
    public function __construct()
    {
        add_action('init', [$this, 'load_plugin_constants']);
        add_action('plugins_loaded', [$this, 'stw_init']);
    }

    public function stw_init()
    {
        new Menu();
        new Enqueue();
        new RestAPI();
    }

    public function load_plugin_constants()
    {
        define('STW_MENU_SLUG', 'spin-the-wheel');
        define('STW_PLUGIN_DIR', plugin_dir_path(__FILE__));
        define('STW_PLUGIN_URL', plugin_dir_url(__FILE__));
        define('STW_ASSETS_URL', STW_PLUGIN_URL . 'build/');
        define('STW_VERSION', null);
        define('STW_DEV_MODE', defined('SCRIPT_DEBUG') && SCRIPT_DEBUG);
    }
}
