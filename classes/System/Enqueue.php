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
        add_action('wp_enqueue_scripts', [$this, 'enqueue_website_styles']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_website_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_dashboard_styles']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_dashboard_scripts']);
    }

    private function get_asset_url($file)
    {
        return $this->is_development
            ? STW_PLUGIN_URL . 'src/scripts/' . $file
            : STW_PLUGIN_URL . 'build/' . $file;
    }

    public function enqueue_website_styles()
    {
        wp_enqueue_style(
            'spin-the-wheel-frontend-style',
            $this->get_asset_url('frontend/style.css'),
            [],
            STW_VERSION
        );
    }

    public function enqueue_website_scripts()
    {
        wp_enqueue_script(
            'spin-the-wheel-frontend-script',
            $this->get_asset_url('frontend/index.js'),
            ['wp-element', 'wp-components', 'wp-api-fetch'],
            STW_VERSION,
            true
        );
    }

    public function enqueue_dashboard_styles()
    {
        wp_enqueue_style(
            'spin-the-wheel-admin-style',
            $this->get_asset_url('admin/style.css'),
            [],
            STW_VERSION
        );
    }

    public function enqueue_dashboard_scripts()
    {
        wp_enqueue_script(
            'spin-the-wheel-admin-script',
            $this->get_asset_url('admin/index.js'),
            ['wp-element', 'wp-components', 'wp-api-fetch'],
            STW_VERSION,
            true
        );
    }
}

new Enqueue();
