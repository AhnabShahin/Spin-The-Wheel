<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Traits\SingletonTrait;
use AhnabShahin\SpinTheWheel\Components\ThemeSelector;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Admin Menu Management
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */
class Menu
{
    use SingletonTrait;

    private $theme_selector;

    private function __construct()
    {
        $this->theme_selector = new ThemeSelector();
        $this->setup_hooks();
    }

    /**
     * Setup WordPress hooks
     */
    private function setup_hooks()
    {
        add_action('admin_menu', [$this, 'register_admin_menu']);
        
        // Only add frontend hook if not in admin
        if (!is_admin()) {
            add_action('wp_footer', [$this, 'render_user_page']);
        }
    }

    /**
     * Register admin menu pages
     */
    public function register_admin_menu()
    {
        // Main menu page
        add_menu_page(
            __('Spin The Wheel', 'spin-the-wheel'),
            __('Spin The Wheel', 'spin-the-wheel'),
            'manage_options',
            STW_MENU_SLUG,
            [$this, 'render_admin_page'],
            'dashicons-admin-generic',
            6
        );

        // Dashboard submenu (same as main page)
        add_submenu_page(
            STW_MENU_SLUG,
            __('Dashboard', 'spin-the-wheel'),
            __('Dashboard', 'spin-the-wheel'),
            'manage_options',
            STW_MENU_SLUG,
            [$this, 'render_admin_page']
        );

        // Theme Settings submenu
        add_submenu_page(
            STW_MENU_SLUG,
            __('Theme Settings', 'spin-the-wheel'),
            __('Theme Settings', 'spin-the-wheel'),
            'manage_options',
            'stw-theme-settings',
            [$this, 'render_theme_settings']
        );

        // Analytics submenu
        add_submenu_page(
            STW_MENU_SLUG,
            __('Analytics', 'spin-the-wheel'),
            __('Analytics', 'spin-the-wheel'),
            'manage_options',
            'stw-analytics',
            [$this, 'render_analytics_page']
        );

        // Settings submenu
        add_submenu_page(
            STW_MENU_SLUG,
            __('Settings', 'spin-the-wheel'),
            __('Settings', 'spin-the-wheel'),
            'manage_options',
            'stw-settings',
            [$this, 'render_settings_page']
        );
    }

    /**
     * Render main admin page
     */
    public function render_admin_page()
    {
        $this->render_admin_wrapper('dashboard');
    }

    /**
     * Render theme settings page
     */
    public function render_theme_settings()
    {
        $this->render_admin_wrapper('theme-settings');
    }

    /**
     * Render analytics page
     */
    public function render_analytics_page()
    {
        $this->render_admin_wrapper('analytics');
    }

    /**
     * Render settings page
     */
    public function render_settings_page()
    {
        $this->render_admin_wrapper('settings');
    }

    /**
     * Render admin page wrapper
     */
    private function render_admin_wrapper($page_type = 'dashboard')
    {
        ?>
        <div class="wrap">
            <div id="spin-the-wheel-admin" data-page="<?php echo esc_attr($page_type); ?>">
                <div class="stw-loading">
                    <p><?php _e('Loading Spin The Wheel...', 'spin-the-wheel'); ?></p>
                    <small style="display: block; margin-top: 10px; color: #666;">
                        If this message persists, please check the browser console for JavaScript errors.
                    </small>
                </div>
            </div>
            <script>
                console.log('STW Debug: Admin page loaded');
                console.log('STW Debug: Element:', document.getElementById('spin-the-wheel-admin'));
                console.log('STW Debug: stwAdminData:', window.stwAdminData);
                
                // Check if scripts are loading
                setTimeout(function() {
                    var element = document.getElementById('spin-the-wheel-admin');
                    var hasLoading = element.querySelector('.stw-loading');
                    if (hasLoading) {
                        console.warn('STW Debug: React app did not mount - loading div still present');
                        console.log('STW Debug: Current element content:', element.innerHTML);
                    } else {
                        console.log('STW Debug: React app mounted successfully');
                    }
                }, 3000);
            </script>
        </div>
        <?php
    }

    /**
     * Render user page (frontend)
     */
    public function render_user_page()
    {
        // Only render if shortcode or specific conditions are met
        if ($this->should_render_frontend()) {
            ?>
            <div id="spin-the-wheel-user" style="display: none;">
                <div class="stw-loading">
                    <p><?php _e('Loading wheel...', 'spin-the-wheel'); ?></p>
                </div>
            </div>
            <?php
        }
    }

    /**
     * Check if frontend should be rendered
     */
    private function should_render_frontend()
    {
        global $post;
        
        // Check if current post has shortcode
        if ($post && has_shortcode($post->post_content, 'spin_wheel')) {
            return true;
        }

        // Check if widget is active
        if (is_active_widget(false, false, 'stw_wheel_widget')) {
            return true;
        }

        // Allow filtering
        return apply_filters('stw_should_render_frontend', false);
    }

    /**
     * Get current admin page
     */
    public function get_current_admin_page()
    {
        if (!is_admin()) {
            return null;
        }

        $screen = get_current_screen();
        if (!$screen) {
            return null;
        }

        $plugin_pages = [
            'toplevel_page_' . STW_MENU_SLUG => 'dashboard',
            'spin-the-wheel_page_stw-theme-settings' => 'theme-settings',
            'spin-the-wheel_page_stw-analytics' => 'analytics',
            'spin-the-wheel_page_stw-settings' => 'settings',
        ];

        return $plugin_pages[$screen->id] ?? null;
    }

    /**
     * Check if current page is a plugin admin page
     */
    public function is_plugin_admin_page()
    {
        return $this->get_current_admin_page() !== null;
    }

    /**
     * Add admin notices for plugin pages
     */
    public function add_admin_notices()
    {
        if (!$this->is_plugin_admin_page()) {
            return;
        }

        // Check if plugin is properly configured
        $database = stw_database();
        if (!$database || !$database->get_setting('wheel_template')) {
            ?>
            <div class="notice notice-warning">
                <p>
                    <?php _e('Spin The Wheel: Please configure your wheel settings to get started.', 'spin-the-wheel'); ?>
                    <a href="<?php echo admin_url('admin.php?page=stw-settings'); ?>" class="button button-primary">
                        <?php _e('Go to Settings', 'spin-the-wheel'); ?>
                    </a>
                </p>
            </div>
            <?php
        }
    }
}
