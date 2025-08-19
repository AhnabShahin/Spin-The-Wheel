<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Database Management Class
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */
class Database {
    use SingletonTrait;

    private $table_name;
    private $analytics_table;
    private $cache = [];

    private function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'stw_settings';
        $this->analytics_table = $wpdb->prefix . 'stw_analytics';
        $this->create_tables();
    }

    /**
     * Create database tables
     */
    public function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            setting_key varchar(50) NOT NULL,
            setting_value longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY setting_key (setting_key)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        // Insert default template if not exists
        if (!$this->get_setting('wheel_template')) {
            $this->update_setting('wheel_template', 'classic');
        }
    }

    /**
     * Get setting value with caching
     */
    public function get_setting($key, $default = null) {
        // Check cache first
        if (isset($this->cache[$key])) {
            return $this->cache[$key];
        }

        global $wpdb;
        
        $value = $wpdb->get_var($wpdb->prepare(
            "SELECT setting_value FROM {$this->table_name} WHERE setting_key = %s",
            $key
        ));

        // Unserialize if needed
        $value = maybe_unserialize($value);
        
        // Cache the value
        $this->cache[$key] = $value !== null ? $value : $default;
        
        return $this->cache[$key];
    }

    /**
     * Update setting value
     */
    public function update_setting($key, $value) {
        global $wpdb;
        
        // Serialize if needed
        $value = maybe_serialize($value);
        
        $existing = $this->get_setting($key);
        
        if ($existing === null) {
            $result = $wpdb->insert(
                $this->table_name,
                [
                    'setting_key' => $key,
                    'setting_value' => $value
                ],
                ['%s', '%s']
            );
        } else {
            $result = $wpdb->update(
                $this->table_name,
                ['setting_value' => $value],
                ['setting_key' => $key],
                ['%s'],
                ['%s']
            );
        }

        // Update cache
        if ($result !== false) {
            $this->cache[$key] = maybe_unserialize($value);
        }

        return $result !== false;
    }

    /**
     * Delete setting
     */
    public function delete_setting($key) {
        global $wpdb;
        
        $result = $wpdb->delete(
            $this->table_name,
            ['setting_key' => $key],
            ['%s']
        );

        // Remove from cache
        if ($result !== false) {
            unset($this->cache[$key]);
        }

        return $result !== false;
    }

    /**
     * Get multiple settings
     */
    public function get_settings($keys = []) {
        if (empty($keys)) {
            return $this->get_all_settings();
        }

        $settings = [];
        foreach ($keys as $key) {
            $settings[$key] = $this->get_setting($key);
        }

        return $settings;
    }

    /**
     * Get all settings
     */
    public function get_all_settings() {
        global $wpdb;
        
        $results = $wpdb->get_results(
            "SELECT setting_key, setting_value FROM {$this->table_name}",
            ARRAY_A
        );

        $settings = [];
        foreach ($results as $row) {
            $settings[$row['setting_key']] = maybe_unserialize($row['setting_value']);
        }

        return $settings;
    }

    /**
     * Clear cache
     */
    public function clear_cache() {
        $this->cache = [];
    }

    /**
     * Get table information
     */
    public function get_table_info() {
        global $wpdb;
        
        return [
            'settings_table' => $this->table_name,
            'analytics_table' => $this->analytics_table,
            'settings_count' => $wpdb->get_var("SELECT COUNT(*) FROM {$this->table_name}"),
            'analytics_count' => $wpdb->get_var("SELECT COUNT(*) FROM {$this->analytics_table}")
        ];
    }
}