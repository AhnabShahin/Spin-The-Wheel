<?php

namespace AhnabShahin\SpinTheWheel;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class EnqueueScripts
{
    public function __construct()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    public function enqueue_admin_assets()
    {
        $current_screen = get_current_screen();
        // if ($current_screen && $current_screen->id === 'toplevel_page_stw') {
            // error log plugin root directory folder
            error_log(plugin_dir_url(__FILE__));
   
            wp_enqueue_script(
                'spin-the-wheel-admin',
                'http://wordpress.test/wp-content/plugins/spin-the-wheel/build/admin.bundle.asset.js',
                ['wp-element'],  // Use WordPress React dependencies
                null,
                true
            );

            wp_enqueue_style(
                'antd-css',
                'https://cdn.jsdelivr.net/npm/antd/dist/reset.css'
            );
        // }
    }
}
