<?php

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Helper Functions for Spin The Wheel Plugin
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */

/**
 * Get the main plugin instance
 * 
 * @return \AhnabShahin\SpinTheWheel\ROOT\Plugin
 */
function stw_plugin() {
    return \AhnabShahin\SpinTheWheel\ROOT\Plugin::instance();
}

/**
 * Get plugin configuration
 * 
 * @return \AhnabShahin\SpinTheWheel\Includes\Config
 */
function stw_config() {
    return stw_plugin()->get_config();
}

/**
 * Get database instance
 * 
 * @return \AhnabShahin\SpinTheWheel\System\Database
 */
function stw_database() {
    return stw_plugin()->get_component('database');
}

/**
 * Get a plugin setting
 * 
 * @param string $key Setting key
 * @param mixed $default Default value
 * @return mixed
 */
function stw_get_setting($key, $default = null) {
    $database = stw_database();
    return $database ? $database->get_setting($key, $default) : $default;
}

/**
 * Update a plugin setting
 * 
 * @param string $key Setting key
 * @param mixed $value Setting value
 * @return bool
 */
function stw_update_setting($key, $value) {
    $database = stw_database();
    return $database ? $database->update_setting($key, $value) : false;
}

/**
 * Get plugin version
 * 
 * @return string
 */
function stw_get_version() {
    return STW_VERSION;
}

/**
 * Check if development mode is enabled
 * 
 * @return bool
 */
function stw_is_dev_mode() {
    return defined('STW_DEV_MODE') && STW_DEV_MODE;
}

/**
 * Generate a nonce for STW actions
 * 
 * @param string $action Action name
 * @return string
 */
function stw_create_nonce($action = 'stw_action') {
    return wp_create_nonce($action);
}

/**
 * Verify a nonce for STW actions
 * 
 * @param string $nonce Nonce to verify
 * @param string $action Action name
 * @return bool
 */
function stw_verify_nonce($nonce, $action = 'stw_action') {
    return wp_verify_nonce($nonce, $action);
}

/**
 * Get plugin asset URL
 * 
 * @param string $path Asset path
 * @return string
 */
function stw_asset_url($path = '') {
    return STW_ASSETS_URL . ltrim($path, '/');
}

/**
 * Get plugin directory path
 * 
 * @param string $path Directory path
 * @return string
 */
function stw_plugin_path($path = '') {
    return STW_PLUGIN_DIR . ltrim($path, '/');
}

/**
 * Check if user has required capability
 * 
 * @param string $capability Capability to check
 * @return bool
 */
function stw_user_can($capability = 'manage_options') {
    return current_user_can($capability);
}

/**
 * Sanitize data for database storage
 * 
 * @param mixed $data Data to sanitize
 * @param string $type Data type (text, email, url, int, float, bool, array)
 * @return mixed
 */
function stw_sanitize_data($data, $type = 'text') {
    switch ($type) {
        case 'text':
            return sanitize_text_field($data);
        case 'textarea':
            return sanitize_textarea_field($data);
        case 'email':
            return sanitize_email($data);
        case 'url':
            return esc_url_raw($data);
        case 'int':
            return (int) $data;
        case 'float':
            return (float) $data;
        case 'bool':
            return (bool) $data;
        case 'array':
            return is_array($data) ? array_map('sanitize_text_field', $data) : [];
        case 'json':
            return wp_json_encode($data);
        default:
            return sanitize_text_field($data);
    }
}

/**
 * Format wheel data for frontend
 * 
 * @param array $data Raw wheel data
 * @return array
 */
function stw_format_wheel_data($data) {
    $defaults = [
        'mustStartSpinning' => false,
        'prizeNumber' => 0,
        'data' => [],
        'backgroundColors' => ['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f'],
        'textColors' => ['#ffffff'],
        'outerBorderColor' => '#000000',
        'outerBorderWidth' => 5,
        'innerRadius' => 0,
        'innerBorderColor' => '#000000',
        'innerBorderWidth' => 0,
        'radiusLineColor' => '#000000',
        'radiusLineWidth' => 5,
        'fontFamily' => 'Helvetica, Arial',
        'fontSize' => 20,
        'fontWeight' => 'bold',
        'fontStyle' => 'normal',
        'perpendicularText' => false,
        'textDistance' => 60,
        'spinDuration' => 1,
        'startingOptionIndex' => 0,
        'disableInitialAnimation' => false
    ];

    return wp_parse_args($data, $defaults);
}

/**
 * Generate wheel shortcode
 * 
 * @param int $theme_id Theme ID
 * @param array $args Additional arguments
 * @return string
 */
function stw_wheel_shortcode($theme_id, $args = []) {
    $defaults = [
        'width' => '400px',
        'height' => '400px',
        'show_result' => true,
        'auto_spin' => false
    ];

    $args = wp_parse_args($args, $defaults);
    
    $shortcode = '[spin_wheel';
    $shortcode .= ' theme_id="' . intval($theme_id) . '"';
    
    foreach ($args as $key => $value) {
        $shortcode .= ' ' . $key . '="' . esc_attr($value) . '"';
    }
    
    $shortcode .= ']';
    
    return $shortcode;
}

/**
 * Log messages (wrapper for existing stw_log function)
 * 
 * @param string $message Log message
 * @param string $level Log level (info, warning, error, debug)
 */
function stw_write_log($message, $level = 'info') {
    if (!stw_is_dev_mode()) {
        return;
    }

    $formatted_message = sprintf(
        '[%s] [%s] %s',
        date('Y-m-d H:i:s'),
        strtoupper($level),
        $message
    );

    if (function_exists('stw_log')) {
        stw_log($formatted_message);
    } else {
        error_log('STW: ' . $formatted_message);
    }
}

/**
 * Check if the current request is a REST API request
 * 
 * @return bool
 */
function stw_is_rest_request() {
    if (defined('REST_REQUEST') && REST_REQUEST) {
        return true;
    }

    global $wp_rewrite;
    if ($wp_rewrite === null) {
        $wp_rewrite = new WP_Rewrite();
    }

    $rest_url = wp_parse_url(get_rest_url());
    $current_url = wp_parse_url(add_query_arg(array()));
    
    return strpos($current_url['path'], $rest_url['path'], 0) === 0;
}

/**
 * Get wheel themes with caching
 * 
 * @param bool $force_refresh Force cache refresh
 * @return array
 */
function stw_get_wheel_themes($force_refresh = false) {
    $cache_key = 'stw_wheel_themes';
    $cache_duration = stw_config()->get('cache_duration', 3600);

    if (!$force_refresh) {
        $cached = get_transient($cache_key);
        if ($cached !== false) {
            return $cached;
        }
    }

    $args = [
        'post_type' => 'roulette_theme',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'meta_query' => [
            [
                'key' => 'data',
                'compare' => 'EXISTS'
            ]
        ]
    ];

    $query = new WP_Query($args);
    $themes = [];

    foreach ($query->posts as $post) {
        $meta = get_post_meta($post->ID);
        $theme_data = [];
        
        foreach ($meta as $key => $value) {
            $theme_data[$key] = maybe_unserialize($value[0]);
        }

        $themes[] = [
            'id' => $post->ID,
            'name' => $post->post_title,
            'description' => $post->post_content,
            'data' => stw_format_wheel_data($theme_data)
        ];
    }

    set_transient($cache_key, $themes, $cache_duration);
    
    return $themes;
}

/**
 * Clear wheel themes cache
 */
function stw_clear_themes_cache() {
    delete_transient('stw_wheel_themes');
}

/**
 * Format file size for display
 * 
 * @param int $bytes File size in bytes
 * @param int $precision Number of decimal places
 * @return string
 */
function stw_format_file_size($bytes, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    
    for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
        $bytes /= 1024;
    }
    
    return round($bytes, $precision) . ' ' . $units[$i];
}
