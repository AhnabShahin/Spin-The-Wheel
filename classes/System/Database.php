<?php

namespace AhnabShahin\SpinTheWheel\System;

class Database {
    private $table_name;

    public function __construct() {
        global $wpdb;
        $this->table_name = $wpdb->prefix . 'stw_settings';
        $this->create_tables();
    }

    public function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$this->table_name} (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            setting_key varchar(50) NOT NULL,
            setting_value longtext NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);

        // Insert default template if not exists
        if (!$this->get_setting('wheel_template')) {
            $this->update_setting('wheel_template', 'classic');
        }
    }

    public function get_setting($key) {
        global $wpdb;
        $result = $wpdb->get_var($wpdb->prepare(
            "SELECT setting_value FROM {$this->table_name} WHERE setting_key = %s",
            $key
        ));
        return $result;
    }

    public function update_setting($key, $value) {
        global $wpdb;
        $existing = $this->get_setting($key);

        if ($existing === null) {
            return $wpdb->insert(
                $this->table_name,
                array(
                    'setting_key' => $key,
                    'setting_value' => $value
                ),
                array('%s', '%s')
            );
        } else {
            return $wpdb->update(
                $this->table_name,
                array('setting_value' => $value),
                array('setting_key' => $key),
                array('%s'),
                array('%s')
            );
        }
    }
}