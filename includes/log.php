<?php

if (!function_exists('stw_log')) {
    /**
     * Log messages to saf.log in the plugin root with an optional tracer (always shown).
     *
     * @param string|array|object $message The message to log.
     * @param string $filename Optional log file name. Default: 'saf.log'
     * @param string|null $tracer Optional tracer string. Will show empty if null.
     */
    function stw_log($message, $tracer = null, $filename = 'swt.log',)
    {
        return error_log(STW_PLUGIN_DIR);
        // Path to plugin root
        $plugin_root = plugin_dir_path(__FILE__);

        // Normalize message
        if (is_array($message) || is_object($message)) {
            $message = print_r($message, true);
        }

        // Always show tracer (even empty)
        $log_entry = '[' . gmdate('d-M-Y H:i:s \U\T\C') . '] [' . $tracer . '] ' . $message . PHP_EOL;

        // Write to log file
        file_put_contents($plugin_root . $filename, $log_entry, FILE_APPEND | LOCK_EX);
    }
}

if (!function_exists('write_log')) {
    /**
     * Log debug messages to saf.log in the plugin root with an optional tracer.
     *
     * @param string|array|object $message The message to log.
     * @param string|null $tracer Optional tracer string. Will show empty if null.
     */
    function write_log($data)
    {
        if (true === WP_DEBUG) {
            if (is_array($data) || is_object($data)) {
                error_log(print_r($data, true));
            } else {
                error_log($data);
            }
        }
    }
}
