<?php

namespace AhnabShahin\SpinTheWheel\Includes;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Plugin Activation, Deactivation and Uninstall hooks
 */
class Activator
{
    public static function activate()
    {
        // Check WordPress version
        if (!self::check_wordpress_version()) {
            deactivate_plugins(plugin_basename(STW_PLUGIN_DIR . 'spin-the-wheel.php'));
            wp_die(__('This plugin requires WordPress 5.0 or higher.', 'spin-the-wheel'));
        }

        // Check PHP version
        if (!self::check_php_version()) {
            deactivate_plugins(plugin_basename(STW_PLUGIN_DIR . 'spin-the-wheel.php'));
            wp_die(__('This plugin requires PHP 7.4 or higher.', 'spin-the-wheel'));
        }

        // Create database tables
        self::create_database_tables();

        // Create default settings
        self::create_default_settings();

        // Set plugin version
        update_option('stw_plugin_version', Config::instance()->get('version'));

        // Flush rewrite rules
        flush_rewrite_rules();
    }

    public static function deactivate()
    {
        // Clean up scheduled events
        wp_clear_scheduled_hook('stw_cleanup_temp_data');
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }

    public static function uninstall()
    {
        if (!current_user_can('activate_plugins')) {
            return;
        }

        // Remove database tables
        self::remove_database_tables();

        // Remove all plugin options
        self::remove_plugin_options();

        // Remove uploaded files
        self::cleanup_uploaded_files();
    }

    private static function check_wordpress_version()
    {
        global $wp_version;
        $minimum_version = '5.0'; // Use constant instead of Config during activation
        return version_compare($wp_version, $minimum_version, '>=');
    }

    private static function check_php_version()
    {
        $minimum_version = '7.4'; // Use constant instead of Config during activation
        return version_compare(PHP_VERSION, $minimum_version, '>=');
    }

    private static function create_database_tables()
    {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // Settings table
        $settings_table = $wpdb->prefix . 'stw_settings';
        $sql = "CREATE TABLE IF NOT EXISTS {$settings_table} (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            setting_key varchar(50) NOT NULL,
            setting_value longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY setting_key (setting_key)
        ) $charset_collate;";

        // Analytics table (for future use)
        $analytics_table = $wpdb->prefix . 'stw_analytics';
        $sql .= "CREATE TABLE IF NOT EXISTS {$analytics_table} (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            theme_id bigint(20),
            user_id bigint(20),
            spin_result varchar(255),
            ip_address varchar(45),
            user_agent text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY theme_id (theme_id),
            KEY user_id (user_id),
            KEY created_at (created_at)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    private static function create_default_settings()
    {
        // Use WordPress native options instead of Database class during activation
        // since the plugin infrastructure might not be fully loaded
        
        // Set default wheel template if not exists
        if (!get_option('stw_wheel_template')) {
            update_option('stw_wheel_template', 'classic');
        }

        // Set other default settings
        $defaults = [
            'stw_enable_analytics' => false,
            'stw_cache_enabled' => true,
            'stw_max_spins_per_day' => 10,
            'stw_default_theme_colors' => json_encode(['#ff8f43', '#70bbe0', '#0b7ec8', '#ffd23f']),
            'stw_default_text_colors' => json_encode(['#ffffff']),
        ];

        foreach ($defaults as $key => $value) {
            if (!get_option($key)) {
                update_option($key, $value);
            }
        }
    }

    private static function remove_database_tables()
    {
        global $wpdb;
        
        $tables = [
            $wpdb->prefix . 'stw_settings',
            $wpdb->prefix . 'stw_analytics'
        ];

        foreach ($tables as $table) {
            $wpdb->query("DROP TABLE IF EXISTS {$table}");
        }
    }

    private static function remove_plugin_options()
    {
        $options = [
            'stw_plugin_version',
            'stw_wheel_theme',
            'stw_theme_options'
        ];

        foreach ($options as $option) {
            delete_option($option);
        }
    }

    private static function cleanup_uploaded_files()
    {
        $upload_dir = wp_upload_dir();
        $plugin_upload_dir = $upload_dir['basedir'] . '/spin-the-wheel/';
        
        if (is_dir($plugin_upload_dir)) {
            self::delete_directory($plugin_upload_dir);
        }
    }

    private static function delete_directory($dir)
    {
        if (!is_dir($dir)) {
            return false;
        }

        $files = array_diff(scandir($dir), array('.', '..'));
        
        foreach ($files as $file) {
            $path = $dir . '/' . $file;
            is_dir($path) ? self::delete_directory($path) : unlink($path);
        }
        
        return rmdir($dir);
    }
}
