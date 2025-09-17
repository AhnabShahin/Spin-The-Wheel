<?php

namespace AhnabShahin\SpinTheWheel\Components\CustomRoulette;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class CustomRouletteMigrationAdmin
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_migration_page']);
        add_action('wp_ajax_stw_migrate_data', [$this, 'handle_migration_ajax']);
    }

    public function add_migration_page()
    {
        // Only show migration page if migration is needed
        if (!CustomRouletteMigration::needs_migration()) {
            return;
        }

        add_submenu_page(
            'spin-the-wheel',
            __('Data Migration', 'spin-the-wheel'),
            __('Data Migration', 'spin-the-wheel'),
            'manage_options',
            'stw-migration',
            [$this, 'render_migration_page']
        );
    }

    public function render_migration_page()
    {
        $status = CustomRouletteMigration::get_migration_status();
        ?>
        <div class="wrap">
            <h1><?php _e('Spin The Wheel - Data Migration', 'spin-the-wheel'); ?></h1>
            
            <div class="notice notice-info">
                <p><?php _e('We\'ve updated the plugin to use a unified data structure. Your existing themes and wheel data can be migrated to the new format.', 'spin-the-wheel'); ?></p>
            </div>

            <div class="card">
                <h2><?php _e('Migration Status', 'spin-the-wheel'); ?></h2>
                <table class="widefat">
                    <tr>
                        <td><?php _e('Existing Themes:', 'spin-the-wheel'); ?></td>
                        <td><strong><?php echo $status['themes_count']; ?></strong></td>
                    </tr>
                    <tr>
                        <td><?php _e('Existing Wheel Data:', 'spin-the-wheel'); ?></td>
                        <td><strong><?php echo $status['wheel_data_count']; ?></strong></td>
                    </tr>
                    <tr>
                        <td><?php _e('Unified Roulettes:', 'spin-the-wheel'); ?></td>
                        <td><strong><?php echo $status['unified_count']; ?></strong></td>
                    </tr>
                </table>
            </div>

            <?php if ($status['needs_migration']): ?>
            <div class="card">
                <h2><?php _e('Start Migration', 'spin-the-wheel'); ?></h2>
                <p><?php _e('Click the button below to migrate your existing data to the new unified format. This will not delete your existing data.', 'spin-the-wheel'); ?></p>
                
                <button id="start-migration" class="button button-primary button-large">
                    <?php _e('Start Migration', 'spin-the-wheel'); ?>
                </button>
                
                <div id="migration-progress" style="display: none; margin-top: 20px;">
                    <div class="notice notice-info">
                        <p><?php _e('Migration in progress...', 'spin-the-wheel'); ?></p>
                    </div>
                </div>
                
                <div id="migration-results" style="display: none; margin-top: 20px;"></div>
            </div>
            <?php else: ?>
            <div class="card">
                <h2><?php _e('No Migration Needed', 'spin-the-wheel'); ?></h2>
                <p><?php _e('Your data is already in the unified format or no data exists to migrate.', 'spin-the-wheel'); ?></p>
            </div>
            <?php endif; ?>
        </div>

        <script>
        jQuery(document).ready(function($) {
            $('#start-migration').on('click', function() {
                var $button = $(this);
                var $progress = $('#migration-progress');
                var $results = $('#migration-results');
                
                $button.prop('disabled', true);
                $progress.show();
                $results.hide();
                
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    data: {
                        action: 'stw_migrate_data',
                        nonce: '<?php echo wp_create_nonce('stw_migration'); ?>'
                    },
                    success: function(response) {
                        $progress.hide();
                        
                        if (response.success) {
                            var html = '<div class="notice notice-success"><p>';
                            html += '<?php _e('Migration completed successfully!', 'spin-the-wheel'); ?>';
                            html += '<br><?php _e('Migrated:', 'spin-the-wheel'); ?> ' + response.data.migrated_count + ' <?php _e('roulettes', 'spin-the-wheel'); ?>';
                            html += '</p></div>';
                            
                            if (response.data.errors.length > 0) {
                                html += '<div class="notice notice-warning"><p><?php _e('Some items had errors:', 'spin-the-wheel'); ?></p><ul>';
                                response.data.errors.forEach(function(error) {
                                    html += '<li>' + error + '</li>';
                                });
                                html += '</ul></div>';
                            }
                            
                            $results.html(html).show();
                            
                            // Refresh page after 3 seconds
                            setTimeout(function() {
                                location.reload();
                            }, 3000);
                        } else {
                            $results.html('<div class="notice notice-error"><p>' + response.data + '</p></div>').show();
                            $button.prop('disabled', false);
                        }
                    },
                    error: function() {
                        $progress.hide();
                        $results.html('<div class="notice notice-error"><p><?php _e('An error occurred during migration.', 'spin-the-wheel'); ?></p></div>').show();
                        $button.prop('disabled', false);
                    }
                });
            });
        });
        </script>
        <?php
    }

    public function handle_migration_ajax()
    {
        // Check nonce
        if (!wp_verify_nonce($_POST['nonce'], 'stw_migration')) {
            wp_die(__('Security check failed', 'spin-the-wheel'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have permission to perform this action', 'spin-the-wheel'));
        }

        $result = CustomRouletteMigration::migrate_to_unified();
        
        wp_send_json_success($result);
    }
}
