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
        
        wp_enqueue_style(
            'spin-the-wheel-admin-style',
            STW_PLUGIN_URL . 'build/index.css',
            array(),
            null
        );

        wp_enqueue_script(
            'spin-the-wheel-admin-script',
            STW_PLUGIN_URL . 'build/index.js',
            array(),
            null,
            true
        );
    }

    public function enqueue_user_scripts($hook)
    {
        wp_enqueue_script('wp-element');
    
        wp_enqueue_script(
            'spin-the-wheel-user-script',
            STW_PLUGIN_URL . 'build/user.js',
            array('wp-element'),
            null,
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
