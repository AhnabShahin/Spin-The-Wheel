<?php

namespace AhnabShahin\SpinTheWheel\Components;

use AhnabShahin\SpinTheWheel\System\Database;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ThemeSelector {
    private $database;

    public function __construct() {
        $this->database = new Database();
        add_action('admin_init', [$this, 'register_settings']);
    }

    public function register_settings() {
        register_setting('stw_theme_options', 'stw_wheel_theme');
    }

    public function render_theme_selector() {
        $current_theme = $this->database->get_setting('wheel_template') ?: 'classic';
        ?>
        <div class="wrap">
            <h2>Wheel Theme Settings</h2>
            <form method="post" action="options.php">
                <?php settings_fields('stw_theme_options'); ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Select Theme</th>
                        <td>
                            <select name="stw_wheel_theme" id="stw_wheel_theme">
                                <option value="classic" <?php selected($current_theme, 'classic'); ?>>Classic</option>
                                <option value="modern" <?php selected($current_theme, 'modern'); ?>>Modern</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <?php submit_button('Save Theme'); ?>
            </form>
        </div>
        <?php
    }

    public function save_theme_settings() {
        if (isset($_POST['stw_wheel_theme'])) {
            $theme = sanitize_text_field($_POST['stw_wheel_theme']);
            $this->database->update_setting('wheel_template', $theme);
        }
    }
}