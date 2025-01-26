<?php

namespace AhnabShahin\SpinTheWheel\System;

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Menu
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'register_admin_menu']);
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
            'Users',
            'Users',
            'manage_options',
            'stw-users',
            [$this, 'render_user_page']
        );
    }

    public function render_admin_page()
    {
        echo '<div id="spin-the-wheel-admin"></div>';
    }

    public function render_user_page()
    {
        echo '<div id="spin-the-wheel-frontend"></div>';
    }
}
