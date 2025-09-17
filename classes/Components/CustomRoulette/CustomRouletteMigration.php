<?php

namespace AhnabShahin\SpinTheWheel\Components\CustomRoulette;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class CustomRouletteMigration
{
    /**
     * Migrate old wheel data and themes to unified roulettes
     */
    public static function migrate_to_unified()
    {
        global $wpdb;

        // Get all themes with their linked wheel data
        $themes = get_posts([
            'post_type' => 'roulette_theme',
            'post_status' => 'publish',
            'posts_per_page' => -1,
        ]);

        $migrated_count = 0;
        $errors = [];

        foreach ($themes as $theme) {
            try {
                // Get theme meta data
                $theme_meta = get_post_custom($theme->ID);
                $wheel_data_id = $theme_meta['wheelDataId'][0] ?? null;

                if (!$wheel_data_id) {
                    $errors[] = "Theme '{$theme->post_title}' has no linked wheel data";
                    continue;
                }

                // Get wheel data
                $wheel_data_post = get_post($wheel_data_id);
                if (!$wheel_data_post || $wheel_data_post->post_type !== 'stw_wheel_data') {
                    $errors[] = "Wheel data not found for theme '{$theme->post_title}'";
                    continue;
                }

                $wheel_slices = maybe_unserialize(get_post_meta($wheel_data_id, 'data', true));
                if (empty($wheel_slices)) {
                    $errors[] = "No slice data found for theme '{$theme->post_title}'";
                    continue;
                }

                // Convert old slice format to new unified format
                $unified_slices = [];
                foreach ($wheel_slices as $index => $slice) {
                    $unified_slices[] = [
                        'option' => $slice['option'] ?? $slice['text'] ?? "Slice " . ($index + 1),
                        'image' => [
                            'uri' => $slice['image']['uri'] ?? '',
                            'offsetX' => $slice['image']['offsetX'] ?? 0,
                            'offsetY' => $slice['image']['offsetY'] ?? 0,
                            'sizeMultiplier' => $slice['image']['sizeMultiplier'] ?? 1,
                            'landscape' => $slice['image']['landscape'] ?? false,
                        ],
                        'style' => [
                            'backgroundColor' => $slice['style']['backgroundColor'] ?? '#ff8f43',
                            'textColor' => $slice['style']['textColor'] ?? '#ffffff',
                            'fontFamily' => $slice['style']['fontFamily'] ?? 'Arial',
                            'fontSize' => $slice['style']['fontSize'] ?? 16,
                            'fontWeight' => $slice['style']['fontWeight'] ?? 400,
                            'fontStyle' => $slice['style']['fontStyle'] ?? 'normal',
                        ],
                        'optionSize' => $slice['optionSize'] ?? 1,
                        'couponId' => $slice['couponId'] ?? '',
                    ];
                }

                // Create unified roulette post
                $unified_post_data = [
                    'post_title' => $theme->post_title,
                    'post_content' => $theme->post_content,
                    'post_status' => 'publish',
                    'post_type' => 'stw_roulette',
                    'post_author' => $theme->post_author,
                    'post_date' => $theme->post_date,
                ];

                $unified_id = wp_insert_post($unified_post_data);
                if (is_wp_error($unified_id)) {
                    $errors[] = "Failed to create unified roulette for theme '{$theme->post_title}': " . $unified_id->get_error_message();
                    continue;
                }

                // Get helper function for meta data
                $get_meta = function($key, $default = null) use ($theme_meta) {
                    if (!isset($theme_meta[$key][0])) return $default;
                    $value = $theme_meta[$key][0];
                    return is_serialized($value) ? maybe_unserialize($value) : $value;
                };

                // Migrate all meta fields
                $meta_fields = [
                    'slices' => $unified_slices,
                    'mustStartSpinning' => (bool) $get_meta('mustStartSpinning', false),
                    'prizeNumber' => (int) $get_meta('prizeNumber', 0),
                    'outerBorderColor' => $get_meta('outerBorderColor', '#000000'),
                    'outerBorderWidth' => (int) $get_meta('outerBorderWidth', 5),
                    'innerRadius' => (int) $get_meta('innerRadius', 0),
                    'innerBorderColor' => $get_meta('innerBorderColor', '#000000'),
                    'innerBorderWidth' => (int) $get_meta('innerBorderWidth', 0),
                    'radiusLineColor' => $get_meta('radiusLineColor', '#000000'),
                    'radiusLineWidth' => (int) $get_meta('radiusLineWidth', 5),
                    'fontFamily' => $get_meta('fontFamily', 'Arial'),
                    'fontSize' => (int) $get_meta('fontSize', 20),
                    'fontWeight' => $get_meta('fontWeight', 400),
                    'fontStyle' => $get_meta('fontStyle', 'normal'),
                    'perpendicularText' => (bool) $get_meta('perpendicularText', false),
                    'textDistance' => (int) $get_meta('textDistance', 60),
                    'spinDuration' => (int) $get_meta('spinDuration', 1000),
                    'startingOptionIndex' => (int) $get_meta('startingOptionIndex', 0),
                    'pointerImageSource' => $get_meta('pointerImageSource', ''),
                    'disableInitialAnimation' => (bool) $get_meta('disableInitialAnimation', false),
                ];

                foreach ($meta_fields as $key => $value) {
                    update_post_meta($unified_id, $key, $value);
                }

                // Add migration meta to track origin
                update_post_meta($unified_id, '_migrated_from_theme_id', $theme->ID);
                update_post_meta($unified_id, '_migrated_from_wheel_data_id', $wheel_data_id);
                update_post_meta($unified_id, '_migration_date', current_time('mysql'));

                $migrated_count++;

            } catch (\Exception $e) {
                $errors[] = "Error migrating theme '{$theme->post_title}': " . $e->getMessage();
            }
        }

        return [
            'migrated_count' => $migrated_count,
            'errors' => $errors,
        ];
    }

    /**
     * Check if migration is needed
     */
    public static function needs_migration()
    {
        $themes_count = wp_count_posts('roulette_theme')->publish ?? 0;
        $unified_count = wp_count_posts('stw_roulette')->publish ?? 0;

        // If we have themes but no unified roulettes, migration is needed
        return $themes_count > 0 && $unified_count === 0;
    }

    /**
     * Get migration status
     */
    public static function get_migration_status()
    {
        $themes_count = wp_count_posts('roulette_theme')->publish ?? 0;
        $wheel_data_count = wp_count_posts('stw_wheel_data')->publish ?? 0;
        $unified_count = wp_count_posts('stw_roulette')->publish ?? 0;

        return [
            'themes_count' => $themes_count,
            'wheel_data_count' => $wheel_data_count,
            'unified_count' => $unified_count,
            'needs_migration' => self::needs_migration(),
        ];
    }
}
