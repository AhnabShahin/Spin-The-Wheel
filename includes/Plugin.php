<?php
namespace AhnabShahin\SpinTheWheel;

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

class Plugin {
    public function __construct() {
        new Menu();
        new EnqueueScripts();
    }
}
