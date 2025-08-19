<?php
/**
 * Simple test script to verify plugin loading
 */

// Simulate WordPress environment constants
define('ABSPATH', '/Users/shahin/Desktop/Xpeed/wordpress/wordpress/');
define('SCRIPT_DEBUG', true);

// Mock WordPress functions
if (!function_exists('plugin_dir_path')) {
    function plugin_dir_path($file) {
        return dirname($file) . '/';
    }
}

if (!function_exists('plugin_dir_url')) {
    function plugin_dir_url($file) {
        return 'http://localhost/wp-content/plugins/' . basename(dirname($file)) . '/';
    }
}

if (!function_exists('plugin_basename')) {
    function plugin_basename($file) {
        return basename(dirname($file)) . '/' . basename($file);
    }
}

if (!function_exists('__')) {
    function __($text, $domain = 'default') {
        return $text;
    }
}

if (!function_exists('add_action')) {
    function add_action($hook, $callback, $priority = 10, $accepted_args = 1) {
        // Mock implementation
        return true;
    }
}

if (!function_exists('register_activation_hook')) {
    function register_activation_hook($file, $callback) {
        // Mock implementation
        return true;
    }
}

if (!function_exists('register_deactivation_hook')) {
    function register_deactivation_hook($file, $callback) {
        // Mock implementation
        return true;
    }
}

// Load the plugin
require_once __DIR__ . '/spin-the-wheel.php';

echo "Plugin file loaded successfully!\n";

// Test if the function exists
if (function_exists('stw_init_plugin')) {
    echo "stw_init_plugin function found!\n";
    
    // Try to call the function
    try {
        stw_init_plugin();
        echo "Plugin initialization completed successfully!\n";
    } catch (Exception $e) {
        echo "Error during plugin initialization: " . $e->getMessage() . "\n";
    }
} else {
    echo "ERROR: stw_init_plugin function not found!\n";
}

// Test if the Plugin class can be instantiated
try {
    $plugin = \AhnabShahin\SpinTheWheel\ROOT\Plugin::instance();
    echo "Plugin instance created successfully!\n";
} catch (Exception $e) {
    echo "Error creating plugin instance: " . $e->getMessage() . "\n";
}
