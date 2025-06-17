<?php

if (!function_exists('stw_load_plugin_constants')) {
    function stw_load_plugin_constants($file)
    {
        define('STW_MENU_SLUG', 'spin-the-wheel');
        define('STW_PLUGIN_DIR', plugin_dir_path($file));
        define('STW_PLUGIN_URL', plugin_dir_url($file));
        define('STW_ASSETS_URL', STW_PLUGIN_URL . 'build/');
        define('STW_VERSION', null);
        define('STW_DEV_MODE', defined('SCRIPT_DEBUG') && SCRIPT_DEBUG);
    }
}
