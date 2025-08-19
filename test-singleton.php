<?php
/**
 * Test ThemeSelector Database singleton usage
 */

// WordPress environment simulation
define('ABSPATH', '/Users/shahin/Desktop/Xpeed/wordpress/wordpress/');

// Mock WordPress functions
function add_action($hook, $callback, $priority = 10, $accepted_args = 1) { return true; }
function register_setting($group, $name) { return true; }

// Load the plugin infrastructure
require_once __DIR__ . '/vendor/autoload.php';

echo "=== Testing ThemeSelector Database Usage ===\n\n";

try {
    // Test Database singleton
    $database = \AhnabShahin\SpinTheWheel\System\Database::instance();
    echo "✓ Database singleton created successfully\n";
    
    // Test ThemeSelector instantiation
    $themeSelector = new \AhnabShahin\SpinTheWheel\Components\ThemeSelector();
    echo "✓ ThemeSelector created successfully (Database singleton usage works)\n";
    
    echo "\n✅ All tests passed! The Database singleton issue is resolved.\n";
    
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "✗ File: " . $e->getFile() . " Line: " . $e->getLine() . "\n";
}

echo "\n=== Test Complete ===\n";
