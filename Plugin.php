<?php

namespace AhnabShahin\SpinTheWheel\ROOT;

use AhnabShahin\SpinTheWheel\Includes\{Config, Autoloader};
use AhnabShahin\SpinTheWheel\Components\RouletteTheme\ThemeApi;
use AhnabShahin\SpinTheWheel\Components\SliceData\DataApi;
use AhnabShahin\SpinTheWheel\System\{Menu, Enqueue, Database, RestAPI};
use AhnabShahin\SpinTheWheel\Traits\SingletonTrait;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Main Plugin Class
 * 
 * @package SpinTheWheel
 * @since 1.0.0
 */
final class Plugin
{
    use SingletonTrait;

    private $config;
    private $loaded = false;
    private $components = [];

    private function __construct()
    {
        $this->config = Config::instance();
        $this->setup_hooks();
        
        // Initialize immediately since we're already in the right context
        $this->init_plugin();
    }

    /**
     * Setup WordPress hooks
     */
    private function setup_hooks()
    {
        add_action('init', [$this, 'register_post_types'], 5);
        add_action('rest_api_init', [$this, 'init_rest_api'], 10);
        
        // Admin hooks
        if (is_admin()) {
            add_action('admin_init', [$this, 'admin_init']);
        }

        // Frontend hooks
        if (!is_admin()) {
            add_action('wp_enqueue_scripts', [$this, 'frontend_init']);
        }
    }

    /**
     * Initialize the plugin
     */
    public function init_plugin()
    {
        if ($this->loaded) {
            return;
        }

        // Check dependencies
        if (!$this->check_dependencies()) {
            return;
        }

        // Load components
        $this->load_components();

        // Mark as loaded
        $this->loaded = true;

        do_action('stw_plugin_loaded');
    }

    /**
     * Check plugin dependencies
     */
    private function check_dependencies()
    {
        // Check if required WordPress features are available
        if (!function_exists('register_rest_route')) {
            add_action('admin_notices', function() {
                echo '<div class="notice notice-error"><p>';
                echo __('Spin The Wheel requires WordPress REST API support.', 'spin-the-wheel');
                echo '</p></div>';
            });
            return false;
        }

        return true;
    }

    /**
     * Load plugin components
     */
    private function load_components()
    {
        // Core system components using singletons
        $this->components['database'] = Database::instance();
        $this->components['menu'] = Menu::instance();
        $this->components['enqueue'] = Enqueue::instance();

        // API components
        $this->components['theme_api'] = new ThemeApi();
        $this->components['data_api'] = new DataApi();

        // Hook for adding custom components
        $this->components = apply_filters('stw_plugin_components', $this->components);
    }

    /**
     * Register custom post types
     */
    public function register_post_types()
    {
        // Register roulette theme post type
        register_post_type('roulette_theme', [
            'labels' => [
                'name' => __('Roulette Themes', 'spin-the-wheel'),
                'singular_name' => __('Roulette Theme', 'spin-the-wheel'),
            ],
            'public' => false,
            'show_ui' => false,
            'show_in_menu' => false,
            'supports' => ['title', 'custom-fields'],
            'capability_type' => 'post',
            'capabilities' => [
                'create_posts' => $this->config->get('capability'),
                'edit_posts' => $this->config->get('capability'),
                'delete_posts' => $this->config->get('capability'),
            ],
        ]);

        // Register wheel data post type
        register_post_type('wheel_data', [
            'labels' => [
                'name' => __('Wheel Data', 'spin-the-wheel'),
                'singular_name' => __('Wheel Data', 'spin-the-wheel'),
            ],
            'public' => false,
            'show_ui' => false,
            'show_in_menu' => false,
            'supports' => ['title', 'custom-fields'],
            'capability_type' => 'post',
            'capabilities' => [
                'create_posts' => $this->config->get('capability'),
                'edit_posts' => $this->config->get('capability'),
                'delete_posts' => $this->config->get('capability'),
            ],
        ]);
    }

    /**
     * Initialize REST API
     */
    public function init_rest_api()
    {
        // REST API initialization is handled by individual API classes
    }

    /**
     * Admin initialization
     */
    public function admin_init()
    {
        // Add admin-specific initialization here
    }

    /**
     * Frontend initialization
     */
    public function frontend_init()
    {
        // Add frontend-specific initialization here
    }

    /**
     * Get component instance
     */
    public function get_component($component_name)
    {
        return $this->components[$component_name] ?? null;
    }

    /**
     * Get plugin configuration
     */
    public function get_config()
    {
        return $this->config;
    }

    /**
     * Check if plugin is loaded
     */
    public function is_loaded()
    {
        return $this->loaded;
    }
}
