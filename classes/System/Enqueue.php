<?php

namespace AhnabShahin\SpinTheWheel\System;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Enqueue
{
    private $is_development;

    public function __construct()
    {
        $this->is_development = defined('STW_DEV_MODE') && STW_DEV_MODE;
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        // Add hook for frontend pages
        add_action('wp_enqueue_scripts', [$this, 'enqueue_user_scripts']);
    }

    public function enqueue_admin_scripts($hook)
    {
        wp_enqueue_script('wp-element');
        wp_enqueue_script(
            'spin-the-wheel-admin-script',
            STW_PLUGIN_URL . 'ui-resources/index.js',
            array(),
            time(),  // Using time() as version to prevent caching
            true
        );

        // Localize *that* same script
        wp_localize_script(
            'spin-the-wheel-admin-script', // must match the enqueued script handle
            'SpinTheWheelData',
            array(
                'rest_url'   => get_rest_url(),
                'rest_nonce' => wp_create_nonce('wp_rest'),
                'site_url'   => get_option('siteurl'),
            )
        );
    }

    public function enqueue_user_scripts($hook)
    {
        wp_enqueue_script('wp-element');

        wp_enqueue_script(
            'spin-the-wheel-user-script',
            STW_PLUGIN_URL . 'ui-resources/user.js',
            array('wp-element'),
            time(),  // Using time() as version to prevent caching
            true
        );

        // Localize script if needed
        wp_localize_script(
            'spin-the-wheel-user-script',
            'stwData',
            array(
                'ajaxurl' => admin_url('admin-ajax.php'),
                'nonce' => wp_create_nonce('stw-nonce')
            )
        );
    }
}

new Enqueue();
