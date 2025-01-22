<?php

namespace AhnabShahin\SpinTheWheel\System;



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
    }

    public function enqueue_website_scripts()
    {
    }

    public function enqueue_dashboard_styles()
    {
        wp_enqueue_style(
            'hello-world-react-style',
            STW_ASSETS_URL . 'styles/user.min.css',
            [],
            '1.0.0'
        );
    }

    public function enqueue_dashboard_scripts()
    {
        wp_enqueue_script(
            'hello-world-react-script',
            STW_ASSETS_URL . 'js/admin.js',
            ['wp-element'],
            '1.0.0',
            true
        );
    }
}

new Enqueue();
