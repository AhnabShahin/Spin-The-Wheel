<?php

namespace AhnabShahin\SpinTheWheel\Components;

use AhnabShahin\SpinTheWheel\System\Database;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ThemeSelector {
    private $database;

    public function __construct() {
        $this->database = Database::instance();
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
            $theme_data = array(
                'name' => sanitize_text_field($_POST['stw_wheel_theme']),
                'backgroundColors' => isset($_POST['backgroundColors']) ? sanitize_text_field($_POST['backgroundColors']) : ['darkgrey', 'lightgrey'],
                'textColors' => isset($_POST['textColors']) ? sanitize_text_field($_POST['textColors']) : ['black'],
                'outerBorderColor' => isset($_POST['outerBorderColor']) ? sanitize_text_field($_POST['outerBorderColor']) : 'black',
                'outerBorderWidth' => isset($_POST['outerBorderWidth']) ? intval($_POST['outerBorderWidth']) : 5,
                'innerRadius' => isset($_POST['innerRadius']) ? intval($_POST['innerRadius']) : 0,
                'innerBorderColor' => isset($_POST['innerBorderColor']) ? sanitize_text_field($_POST['innerBorderColor']) : 'black',
                'innerBorderWidth' => isset($_POST['innerBorderWidth']) ? intval($_POST['innerBorderWidth']) : 0,
                'radiusLineColor' => isset($_POST['radiusLineColor']) ? sanitize_text_field($_POST['radiusLineColor']) : 'black',
                'radiusLineWidth' => isset($_POST['radiusLineWidth']) ? intval($_POST['radiusLineWidth']) : 5,
                'fontFamily' => isset($_POST['fontFamily']) ? sanitize_text_field($_POST['fontFamily']) : 'Helvetica, Arial',
                'fontSize' => isset($_POST['fontSize']) ? intval($_POST['fontSize']) : 20,
                'fontWeight' => isset($_POST['fontWeight']) ? sanitize_text_field($_POST['fontWeight']) : 'bold',
                'fontStyle' => isset($_POST['fontStyle']) ? sanitize_text_field($_POST['fontStyle']) : 'normal',
                'perpendicularText' => isset($_POST['perpendicularText']) ? (bool)$_POST['perpendicularText'] : false,
                'textDistance' => isset($_POST['textDistance']) ? intval($_POST['textDistance']) : 60,
                'spinDuration' => isset($_POST['spinDuration']) ? floatval($_POST['spinDuration']) : 1.0,
                'disableInitialAnimation' => isset($_POST['disableInitialAnimation']) ? (bool)$_POST['disableInitialAnimation'] : false
            );
            
            $this->database->update_setting('wheel_template', $theme_data['name']);
            $this->database->update_setting('wheel_theme_' . $theme_data['name'], json_encode($theme_data));
        }
    }
}