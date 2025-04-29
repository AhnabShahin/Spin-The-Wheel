<?php

namespace AhnabShahin\SpinTheWheel\System;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Menu
{
    private $theme_selector;

    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('wp_footer', [$this, 'render_user_page']);
        $this->theme_selector = new \AhnabShahin\SpinTheWheel\Components\ThemeSelector();
    }

    public function register_admin_menu()
    {
        add_menu_page(
            'Spin The Wheel',
            'Spin The Wheel',
            'manage_options',
            STW_MENU_SLUG,
            [$this, 'render_admin_page'],
            'dashicons-admin-generic',
            6
        );

        add_submenu_page(
            STW_MENU_SLUG,
            'Dashboard',
            'Dashboard',
            'manage_options',
            STW_MENU_SLUG,
            [$this, 'render_admin_page']
        );

        add_submenu_page(
            STW_MENU_SLUG,
            'Theme Settings',
            'Theme Settings',
            'manage_options',
            'stw-theme-settings',
            [$this, 'render_theme_settings']
        );
    }

    public function render_admin_page()
    {
        echo '<div id="spin-the-wheel-admin"></div>';
    }

    public function render_theme_settings()
    {
        $this->theme_selector->render_theme_selector();
    }

    public function render_user_page()
    {
        echo '<div id="spin-the-wheel-user"></div>';
    }
}
