<?php
/**
 * Plugin diagnostic script to check what's happening during loading
 */

// WordPress environment simulation
define('ABSPATH', '/Users/shahin/Desktop/Xpeed/wordpress/wordpress/');
define('SCRIPT_DEBUG', true);

// Mock essential WordPress functions
function plugin_dir_path($file) { return dirname($file) . '/'; }
function plugin_dir_url($file) { return 'http://localhost/wp-content/plugins/' . basename(dirname($file)) . '/'; }
function plugin_basename($file) { return basename(dirname($file)) . '/' . basename($file); }
function __($text, $domain = 'default') { return $text; }
function esc_html($text) { return htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); }
function add_action($hook, $callback, $priority = 10, $accepted_args = 1) { return true; }
function register_activation_hook($file, $callback) { return true; }
function register_deactivation_hook($file, $callback) { return true; }
function is_admin() { return true; }
function apply_filters($filter, $value) { return $value; }
function do_action($action) { return true; }

echo "=== Spin The Wheel Plugin Diagnostic ===\n\n";

// Test 1: Check if the main plugin file loads
echo "1. Testing main plugin file loading...\n";
try {
    require_once __DIR__ . '/spin-the-wheel.php';
    echo "   ✓ Main plugin file loaded successfully\n";
} catch (Exception $e) {
    echo "   ✗ Error loading main plugin file: " . $e->getMessage() . "\n";
    exit(1);
}

// Test 2: Check if constants are defined
echo "\n2. Testing plugin constants...\n";
$required_constants = ['STW_PLUGIN_FILE', 'STW_PLUGIN_DIR', 'STW_PLUGIN_URL', 'STW_VERSION'];
foreach ($required_constants as $constant) {
    if (defined($constant)) {
        echo "   ✓ $constant = " . constant($constant) . "\n";
    } else {
        echo "   ✗ $constant is not defined\n";
    }
}

// Test 3: Check if composer autoloader is working
echo "\n3. Testing composer autoloader...\n";
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo "   ✓ Composer autoloader file exists\n";
    try {
        require_once __DIR__ . '/vendor/autoload.php';
        echo "   ✓ Composer autoloader loaded\n";
    } catch (Exception $e) {
        echo "   ✗ Error loading composer autoloader: " . $e->getMessage() . "\n";
    }
} else {
    echo "   ✗ Composer autoloader file not found\n";
}

// Test 4: Check if key classes can be loaded
echo "\n4. Testing class loading...\n";
$classes_to_test = [
    'AhnabShahin\SpinTheWheel\ROOT\Plugin',
    'AhnabShahin\SpinTheWheel\Includes\Config',
    'AhnabShahin\SpinTheWheel\System\Database',
    'AhnabShahin\SpinTheWheel\System\Menu',
];

foreach ($classes_to_test as $class) {
    if (class_exists($class)) {
        echo "   ✓ $class exists\n";
    } else {
        echo "   ✗ $class not found\n";
    }
}

// Test 5: Check if functions are defined
echo "\n5. Testing function definitions...\n";
$functions_to_test = ['stw_init_plugin', 'stw'];
foreach ($functions_to_test as $function) {
    if (function_exists($function)) {
        echo "   ✓ $function() is defined\n";
    } else {
        echo "   ✗ $function() is not defined\n";
    }
}

// Test 6: Try to instantiate the Plugin class
echo "\n6. Testing Plugin instantiation...\n";
try {
    $plugin = \AhnabShahin\SpinTheWheel\ROOT\Plugin::instance();
    echo "   ✓ Plugin instance created successfully\n";
    echo "   ✓ Plugin type: " . get_class($plugin) . "\n";
} catch (Exception $e) {
    echo "   ✗ Error creating plugin instance: " . $e->getMessage() . "\n";
    echo "   ✗ File: " . $e->getFile() . " Line: " . $e->getLine() . "\n";
}

echo "\n=== Diagnostic Complete ===\n";
