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
    }

    public function enqueue_admin_scripts($hook)
    {

        wp_enqueue_style(
            'spin-the-wheel-admin-style',
            STW_PLUGIN_URL . 'dist/assets/main.css',
            array(),
            null
        );


        wp_enqueue_script(
            'spin-the-wheel-admin-script',
            STW_PLUGIN_URL . 'dist/assets/main.js',
            array(),
            null,
            true
        );
    }
}

new Enqueue();
