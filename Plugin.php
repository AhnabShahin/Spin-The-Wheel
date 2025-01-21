<?php
namespace AhnabShahin\SpinTheWheel\Plugin;


if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Plugin
{
    const MENU_SLUG = 'hello-world-react';

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
    }

    /**
     * Register admin menu.
     */
    public function register_admin_menu()
    {
        add_menu_page(
            __('Hello World React', 'hello-world-react-plugin'),
            __('Hello World React', 'hello-world-react-plugin'),
            'manage_options',
            self::MENU_SLUG,
            [$this, 'render_admin_page'],
            'dashicons-smiley'
        );
    }

    /**
     * Enqueue React scripts.
     */
    public function enqueue_admin_scripts($hook_suffix)
    {
        $plugin_dir = plugin_dir_url(__FILE__);
        
        // if ($hook_suffix !== 'toplevel_page_' . self::MENU_SLUG) {
        //     return;
        // }

        wp_enqueue_script(
            'hello-world-react-script',
            $plugin_dir . 'build/index.js',
            ['wp-element'],
            '1.0.0',
            true
        );
        error_log($plugin_dir . 'build/index.js');

    }

    /**
     * Render the admin page.
     */
    public function render_admin_page()
    {
        echo '<div id="hello-world-react-root"></div>';
    }
}
