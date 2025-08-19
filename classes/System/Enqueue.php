<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Includes\Config;
use AhnabShahin\SpinTheWheel\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Script and Style Enqueue Management
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */
class Enqueue
{
    use SingletonTrait;

    private $config;
    private $is_development;
    private $version;

    private function __construct()
    {
        $this->config = Config::instance();
        $this->is_development = $this->config->is_development();
        $this->version = $this->config->get_asset_version();
        
        $this->setup_hooks();
    }

    /**
     * Setup WordPress hooks
     */
    private function setup_hooks()
    {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_scripts']);
        
        // Add inline styles if needed
        add_action('wp_head', [$this, 'add_frontend_inline_styles']);
        add_action('admin_head', [$this, 'add_admin_inline_styles']);
    }

    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook)
    {
        // Only load on plugin pages
        if (!$this->is_plugin_page($hook)) {
            return;
        }

        // Load vendors first (contains React and other dependencies)
        $this->enqueue_script(
            'spin-the-wheel-vendors',
            'vendors.js',
            [],
            true
        );

        // Load shared utilities
        $this->enqueue_script(
            'spin-the-wheel-shared',
            'shared.js',
            ['spin-the-wheel-vendors'],
            true
        );

        // Main admin script (dependencies will be auto-loaded from .asset.php)
        $this->enqueue_script(
            'spin-the-wheel-admin',
            'index.js',
            ['spin-the-wheel-vendors', 'spin-the-wheel-shared'],
            true
        );

        // Localize admin script
        $this->localize_admin_script();
    }

    /**
     * Enqueue frontend scripts and styles
     */
    public function enqueue_frontend_scripts()
    {
        // Don't load on admin pages
        if (is_admin()) {
            return;
        }

        // Load vendors first
        $this->enqueue_script(
            'spin-the-wheel-vendors',
            'vendors.js',
            [],
            true
        );

        // Load shared utilities
        $this->enqueue_script(
            'spin-the-wheel-shared',
            'shared.js',
            ['spin-the-wheel-vendors'],
            true
        );

        // Frontend script (dependencies will be auto-loaded from .asset.php)
        $this->enqueue_script(
            'spin-the-wheel-frontend',
            'user.js',
            ['spin-the-wheel-vendors', 'spin-the-wheel-shared'],
            true
        );

        // Localize frontend script
        $this->localize_frontend_script();
    }

    /**
     * Enqueue script with proper versioning
     */
    private function enqueue_script($handle, $filename, $deps = [], $in_footer = true)
    {
        $file_path = STW_PLUGIN_DIR . 'ui-resources/' . $filename;
        $file_url = STW_ASSETS_URL . $filename;
        
        // Check if file exists
        if (!file_exists($file_path)) {
            if ($this->is_development) {
                error_log("STW: Script file not found: {$file_path}");
            }
            return false;
        }

        // Get dependencies from asset file if available
        $asset_deps = $this->get_asset_dependencies($filename);
        $final_deps = array_merge($deps, $asset_deps);

        // Get version from asset file if available
        $version = $this->get_asset_version($filename) ?: $this->version;

        wp_enqueue_script(
            $handle,
            $file_url,
            $final_deps,
            $version,
            $in_footer
        );

        return true;
    }

    /**
     * Enqueue style with proper versioning
     */
    private function enqueue_style($handle, $filename, $deps = [], $media = 'all')
    {
        $file_path = STW_PLUGIN_DIR . 'ui-resources/' . $filename;
        $file_url = STW_ASSETS_URL . $filename;
        
        // Check if file exists
        if (!file_exists($file_path)) {
            if ($this->is_development) {
                error_log("STW: Style file not found: {$file_path}");
            }
            return false;
        }

        wp_enqueue_style(
            $handle,
            $file_url,
            $deps,
            $this->version,
            $media
        );

        return true;
    }

    /**
     * Localize admin script with data
     */
    private function localize_admin_script()
    {
        $data = [
            'rest_url' => get_rest_url(),
            'rest_nonce' => wp_create_nonce('wp_rest'),
            'admin_url' => admin_url('admin-ajax.php'),
            'site_url' => get_option('siteurl'),
            'plugin_url' => STW_PLUGIN_URL,
            'assets_url' => STW_ASSETS_URL,
            'nonce' => wp_create_nonce('stw-admin-nonce'),
            'user_id' => get_current_user_id(),
            'user_capabilities' => [
                'manage_options' => current_user_can('manage_options'),
                'edit_posts' => current_user_can('edit_posts'),
            ],
            'config' => [
                'version' => $this->config->get('version'),
                'dev_mode' => $this->is_development,
                'rest_namespace' => $this->config->get('rest_namespace'),
                'default_theme_settings' => $this->config->get('default_theme_settings'),
            ],
            'i18n' => [
                'loading' => __('Loading...', 'spin-the-wheel'),
                'save' => __('Save', 'spin-the-wheel'),
                'cancel' => __('Cancel', 'spin-the-wheel'),
                'delete' => __('Delete', 'spin-the-wheel'),
                'edit' => __('Edit', 'spin-the-wheel'),
                'error' => __('An error occurred', 'spin-the-wheel'),
                'success' => __('Success', 'spin-the-wheel'),
            ]
        ];

        wp_localize_script(
            'spin-the-wheel-admin',
            'stwAdminData',
            apply_filters('stw_admin_localized_data', $data)
        );
    }

    /**
     * Localize frontend script with data
     */
    private function localize_frontend_script()
    {
        $data = [
            'rest_url' => get_rest_url(),
            'rest_nonce' => wp_create_nonce('wp_rest'),
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('stw-frontend-nonce'),
            'user_id' => get_current_user_id(),
            'is_user_logged_in' => is_user_logged_in(),
            'config' => [
                'version' => $this->config->get('version'),
                'rest_namespace' => $this->config->get('rest_namespace'),
            ],
            'i18n' => [
                'spin' => __('Spin', 'spin-the-wheel'),
                'spinning' => __('Spinning...', 'spin-the-wheel'),
                'congratulations' => __('Congratulations!', 'spin-the-wheel'),
                'try_again' => __('Try Again', 'spin-the-wheel'),
                'error' => __('An error occurred', 'spin-the-wheel'),
            ]
        ];

        wp_localize_script(
            'spin-the-wheel-frontend',
            'stwData',
            apply_filters('stw_frontend_localized_data', $data)
        );
    }

    /**
     * Add admin inline styles
     */
    public function add_admin_inline_styles()
    {
        if (!$this->is_plugin_page()) {
            return;
        }

        $css = "
            .stw-admin-container {
                margin: 20px 0;
            }
            .stw-loading {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 200px;
            }
            .stw-error {
                color: #d63638;
                background: #fcf0f1;
                border: 1px solid #d63638;
                padding: 10px;
                border-radius: 4px;
                margin: 10px 0;
            }
        ";

        printf('<style type="text/css">%s</style>', $css);
    }

    /**
     * Add frontend inline styles
     */
    public function add_frontend_inline_styles()
    {
        $css = "
            .stw-wheel-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .stw-wheel-wrapper {
                position: relative;
                margin-bottom: 20px;
            }
            .stw-spin-button {
                background: #0073aa;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
                transition: background-color 0.3s ease;
            }
            .stw-spin-button:hover {
                background: #005a87;
            }
            .stw-spin-button:disabled {
                background: #ccc;
                cursor: not-allowed;
            }
            .stw-result {
                margin-top: 20px;
                padding: 15px;
                background: #f0f0f0;
                border-radius: 4px;
                text-align: center;
            }
        ";

        printf('<style type="text/css">%s</style>', $css);
    }

    /**
     * Check if current page is a plugin page
     */
    private function is_plugin_page($hook = null)
    {
        if ($hook === null) {
            global $hook_suffix;
            $hook = $hook_suffix;
        }

        $plugin_pages = [
            'toplevel_page_' . STW_MENU_SLUG,
            'spin-the-wheel_page_stw-theme-settings',
            'spin-the-wheel_page_stw-analytics',
            'spin-the-wheel_page_stw-settings',
        ];

        return in_array($hook, $plugin_pages, true);
    }

    /**
     * Get current page context
     */
    public function get_page_context()
    {
        if (is_admin()) {
            return $this->is_plugin_page() ? 'admin' : 'other_admin';
        }

        return 'frontend';
    }

    /**
     * Conditionally load scripts
     */
    public function maybe_enqueue_script($handle, $condition = true)
    {
        if (!$condition) {
            return false;
        }

        if (wp_script_is($handle, 'registered')) {
            wp_enqueue_script($handle);
            return true;
        }

        return false;
    }

    /**
     * Get asset dependencies
     */
    public function get_asset_dependencies($filename)
    {
        $asset_file = STW_PLUGIN_DIR . 'ui-resources/' . str_replace('.js', '.asset.php', $filename);
        
        if (file_exists($asset_file)) {
            $asset = require $asset_file;
            return $asset['dependencies'] ?? [];
        }

        return [];
    }

    /**
     * Get asset version
     */
    private function get_asset_version($filename)
    {
        $asset_file = STW_PLUGIN_DIR . 'ui-resources/' . str_replace('.js', '.asset.php', $filename);
        
        if (file_exists($asset_file)) {
            $asset = require $asset_file;
            return $asset['version'] ?? null;
        }

        return null;
    }
}
