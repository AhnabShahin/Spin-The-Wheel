<?php

/**
 * Plugin Name:       Spin The Wheel
 * Plugin URI:        https://github.com/AhnabShahin/Spin-The-Wheel
 * Description:       A customizable and feature-rich spin-the-wheel plugin for WordPress with advanced theming and analytics.
 * Version:           1.0.0
 * Requires at least: 5.0
 * Requires PHP:      7.4
 * Author:            Ahnab Shahin
 * Author URI:        https://github.com/AhnabShahin
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       spin-the-wheel
 * Domain Path:       /languages
 * Network:           false
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Define plugin constants
if (!function_exists('stw_define_constants')) {
    function stw_define_constants($plugin_file) {
        define('STW_PLUGIN_FILE', $plugin_file);
        define('STW_PLUGIN_DIR', plugin_dir_path($plugin_file));
        define('STW_PLUGIN_URL', plugin_dir_url($plugin_file));
        define('STW_PLUGIN_BASENAME', plugin_basename($plugin_file));
        define('STW_MENU_SLUG', 'spin-the-wheel');
        define('STW_ASSETS_URL', STW_PLUGIN_URL . 'ui-resources/');
        define('STW_VERSION', '1.0.0');
        define('STW_DEV_MODE', defined('SCRIPT_DEBUG') && SCRIPT_DEBUG);
        define('STW_MIN_WP_VERSION', '5.0');
        define('STW_MIN_PHP_VERSION', '7.4');
    }
}

// Initialize constants
stw_define_constants(__FILE__);

// Check system requirements
if (version_compare(PHP_VERSION, STW_MIN_PHP_VERSION, '<')) {
    add_action('admin_notices', function() {
        echo '<div class="notice notice-error"><p>';
        printf(
            __('Spin The Wheel requires PHP %s or higher. You are running PHP %s.', 'spin-the-wheel'),
            STW_MIN_PHP_VERSION,
            PHP_VERSION
        );
        echo '</p></div>';
    });
    return;
}

// Load autoloader
if (file_exists(STW_PLUGIN_DIR . 'vendor/autoload.php')) {
    require_once STW_PLUGIN_DIR . 'vendor/autoload.php';
} else {
    // Fallback autoloader
    require_once STW_PLUGIN_DIR . 'includes/Autoloader.php';
    \AhnabShahin\SpinTheWheel\Includes\Autoloader::instance()->register();
}

// Load plugin constants helper (for backward compatibility)
if (file_exists(STW_PLUGIN_DIR . 'includes/plugin-constants.php')) {
    require_once STW_PLUGIN_DIR . 'includes/plugin-constants.php';
    
    if (!function_exists('stw_load_plugin_constants')) {
        function stw_load_plugin_constants($file) {
            // Already loaded via stw_define_constants
        }
    }
}

// Load helper functions
if (file_exists(STW_PLUGIN_DIR . 'includes/functions.php')) {
    require_once STW_PLUGIN_DIR . 'includes/functions.php';
}

// Load logging if exists
if (file_exists(STW_PLUGIN_DIR . 'includes/log.php')) {
    require_once STW_PLUGIN_DIR . 'includes/log.php';
}

// Activation, deactivation, and uninstall hooks
register_activation_hook(__FILE__, function() {
    if (STW_DEV_MODE && function_exists('error_log')) {
        error_log('STW: Plugin activation started...');
    }
    
    require_once STW_PLUGIN_DIR . 'includes/Activator.php';
    \AhnabShahin\SpinTheWheel\Includes\Activator::activate();
    
    if (STW_DEV_MODE && function_exists('error_log')) {
        error_log('STW: Plugin activation completed.');
    }
});

register_deactivation_hook(__FILE__, function() {
    if (STW_DEV_MODE && function_exists('error_log')) {
        error_log('STW: Plugin deactivation started...');
    }
    
    require_once STW_PLUGIN_DIR . 'includes/Activator.php';
    \AhnabShahin\SpinTheWheel\Includes\Activator::deactivate();
    
    if (STW_DEV_MODE && function_exists('error_log')) {
        error_log('STW: Plugin deactivation completed.');
    }
});

// Initialize the plugin
function stw_init_plugin() {
    try {
        // Log initialization start
        if (STW_DEV_MODE && function_exists('error_log')) {
            error_log('STW: Starting plugin initialization...');
        }
        
        // Initialize the main plugin class
        $plugin = \AhnabShahin\SpinTheWheel\ROOT\Plugin::instance();
        
        // Log successful initialization in development mode
        if (STW_DEV_MODE && function_exists('stw_log')) {
            stw_log('Spin The Wheel plugin initialized successfully.');
        }
        
        if (STW_DEV_MODE && function_exists('error_log')) {
            error_log('STW: Plugin initialization completed successfully.');
        }
    } catch (\Exception $e) {
        // Log error and show admin notice
        if (function_exists('stw_log')) {
            stw_log('Failed to initialize Spin The Wheel plugin: ' . $e->getMessage());
        }
        
        if (STW_DEV_MODE && function_exists('error_log')) {
            error_log('STW Error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
        }
        
        add_action('admin_notices', function() use ($e) {
            echo '<div class="notice notice-error"><p>';
            printf(
                __('Spin The Wheel failed to initialize: %s', 'spin-the-wheel'),
                esc_html($e->getMessage())
            );
            echo '</p></div>';
        });
    }
}

// Hook into WordPress
add_action('plugins_loaded', 'stw_init_plugin', 10);

// Global function to get plugin instance
if (!function_exists('stw')) {
    function stw() {
        return \AhnabShahin\SpinTheWheel\ROOT\Plugin::instance();
    }
}
