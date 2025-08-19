<?php

namespace AhnabShahin\SpinTheWheel\Includes;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Custom Autoloader for the plugin
 * Provides fallback autoloading in case Composer autoloader fails
 */
class Autoloader
{
    private static $instance = null;
    private $namespace_prefix = 'AhnabShahin\\SpinTheWheel\\';
    private $base_dir;

    private function __construct()
    {
        $this->base_dir = STW_PLUGIN_DIR . 'classes/';
    }

    public static function instance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function register()
    {
        spl_autoload_register([$this, 'autoload']);
    }

    public function autoload($class)
    {
        // Check if the class uses our namespace
        $len = strlen($this->namespace_prefix);
        if (strncmp($this->namespace_prefix, $class, $len) !== 0) {
            return;
        }

        // Get the relative class name
        $relative_class = substr($class, $len);

        // Replace namespace separators with directory separators
        $file = $this->base_dir . str_replace('\\', '/', $relative_class) . '.php';

        // If the file exists, require it
        if (file_exists($file)) {
            require $file;
        }
    }
}
