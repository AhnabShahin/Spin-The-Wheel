<?php

namespace AhnabShahin\SpinTheWheel\Includes;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Plugin Configuration and Settings
 */
class Config
{
    private static $instance = null;
    private $settings = [];

    private function __construct()
    {
        $this->load_default_settings();
    }

    public static function instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function load_default_settings()
    {
        $this->settings = [
            'version' => '1.0.0',
            'minimum_wp_version' => '5.0',
            'minimum_php_version' => '7.4',
            'text_domain' => 'spin-the-wheel',
            'menu_position' => 6,
            'capability' => 'manage_options',
            'rest_namespace' => 'stw/v1',
            'cache_duration' => 3600, // 1 hour
            'max_themes_per_page' => 10,
            'default_theme_settings' => [
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
            ]
        ];
    }

    public function get($key, $default = null)
    {
        return $this->settings[$key] ?? $default;
    }

    public function set($key, $value)
    {
        $this->settings[$key] = $value;
    }

    public function get_all()
    {
        return $this->settings;
    }

    public function is_development()
    {
        return defined('STW_DEV_MODE') && STW_DEV_MODE;
    }

    public function get_asset_version()
    {
        return $this->is_development() ? time() : $this->get('version');
    }
}
