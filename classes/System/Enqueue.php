<?php

namespace AhnabShahin\SpinTheWheel\System;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Enqueue
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_website_styles']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_website_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_dashboard_styles']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_dashboard_scripts']);
    }

    public function enqueue_website_styles()
    {
        wp_enqueue_style(
            'spin-the-wheel-frontend-style',
            STW_PLUGIN_URL . 'build/frontend.css',
            [],
            '1.0.0'
        );
    }

    public function enqueue_website_scripts()
    {
        wp_enqueue_script(
            'spin-the-wheel-frontend-script',
            STW_PLUGIN_URL . 'build/frontend.js',
            ['wp-element', 'wp-components', 'wp-api-fetch'],
            '1.0.0',
            true
        );
    }

    public function enqueue_dashboard_styles()
    {
        wp_enqueue_style(
            'spin-the-wheel-admin-style',
            STW_PLUGIN_URL . 'build/admin.css',
            [],
            '1.0.0'
        );
    }

    public function enqueue_dashboard_scripts()
    {
        wp_enqueue_script(
            'spin-the-wheel-admin-script',
            STW_PLUGIN_URL . 'build/admin.js',
            ['wp-element', 'wp-components', 'wp-api-fetch'],
            '1.0.0',
            true
        );
    }
}

new Enqueue();
