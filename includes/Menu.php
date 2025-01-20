<?php

namespace AhnabShahin\SpinTheWheel;

class Menu
{ 
    public function __construct()
    {
        add_action('admin_menu', array($this, 'stw_register_admin_menu'));
    }

    public function stw_register_admin_menu()
    {
        add_menu_page(
            'Spin The Wheel',                 // Page title
            'Spin The Wheel',                 // Menu title
            'manage_options',                 // Capability
            'toplevel_page_stw',                            // Menu slug
            [$this, 'display_plugin_page'],     // Callback
            'dashicons-admin-generic',        // Icon
            20                                // Position
        );
    }

    public function display_plugin_page()
    {
        echo '<div class="wrap"><h1>Spin The Wheel</h1><div id="admin-react-app"></div></div>';
    }
}
