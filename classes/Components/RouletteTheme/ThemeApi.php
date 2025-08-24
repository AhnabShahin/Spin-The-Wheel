<?php

namespace AhnabShahin\SpinTheWheel\Components\RouletteTheme;

use AhnabShahin\SpinTheWheel\System\RestAPI;
use AhnabShahin\SpinTheWheel\System\Validator;
use WP_REST_Request;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class ThemeApi extends RestAPI
{
    private const POST_TYPE = 'roulette_theme';
    public function config(): void
    {
        $this->apiBasePrefix = 'template';
    }

    public function post_roulette_theme(WP_REST_Request $request, ?int $id = null)
    {
        $data = $request->get_json_params() ?? [];

        // Validate wheelDataId early
        if (empty($data['wheelDataId']) || !is_int($data['wheelDataId'])) {
            return $this->responseError('wheelDataId is required and must be an integer.');
        }

        // Validate theme name for new themes
        if (is_null($id) && empty($data['name'])) {
            return $this->responseError('Theme name is required.');
        }

        // Get wheel data and validate
        $wheelData = get_post_meta($data['wheelDataId'], 'data', true);
        if (empty($wheelData)) {
            return $this->responseError('Invalid wheel Data.');
        }

        // Prepare data for validation
        $data['data'] = maybe_unserialize($wheelData);
        unset($data['wheelDataId']);

        // Validate against theme rules
        $rules = ThemeFields::get();
        $errors = Validator::instance()->make($data, $rules);
        if (!empty($errors)) {
            return $this->responseErrors(array_values($errors));
        }

        // Create or update post
        $postData = [
            'post_title'   => sanitize_text_field($data['name'] ?? ''),
            'post_content' => sanitize_post($data['description'] ?? ''),
            'post_status'  => 'publish',
            'post_type'    => self::POST_TYPE,
            'post_author'  => get_current_user_id(),
        ];

        if (is_null($id)) {
            // Create new post
            $id = wp_insert_post($postData);
            if (is_wp_error($id)) {
                return $this->responseError('Failed to create theme: ' . $id->get_error_message());
            }
        } else {
            // Update existing post
            $postData['ID'] = $id;
            $result = wp_update_post($postData);
            if (is_wp_error($result)) {
                return $this->responseError('Failed to update theme: ' . $result->get_error_message());
            }
        }

        // Update meta data in batch
        $metaUpdates = [];
        foreach (array_keys($rules) as $key) {
            if (isset($data[$key])) {
                $metaUpdates[$key] = $data[$key];
            }
        }

        // Batch update meta fields
        foreach ($metaUpdates as $key => $value) {
            update_post_meta($id, $key, $value);
        }

        // Get updated theme data
        $theme = get_post($id);
        $themeMeta = array_map(function ($meta) {
            return maybe_unserialize($meta[0] ?? '');
        }, get_post_meta($id));

        return $this->responseSuccess([
            'id' => $id,
            'name' => $theme->post_title,
            'description' => $theme->post_content,
            'created_at' => $theme->post_date,
            'updated_at' => $theme->post_modified,
            ...$themeMeta
        ]);
    }

    public function get_roulette_theme(WP_REST_Request $request, ?int $id = null)
    {
        if (is_null($id)) {
            return $this->responseError('Theme ID is required.');
        }

        $themeData = get_post($id);
        if (!$themeData) {
            return $this->responseError('Theme not found.');
        }

        // get the meta single . deserialize the data if needed
        $themeMeta = array_map(function ($meta) {
            return maybe_unserialize($meta[0]);
        }, get_post_meta($id));

        return $this->responseSuccess([
            'theme_id'  => $id,
            'theme_data' => $themeData,
            'theme_meta' => $themeMeta
        ]);
    }

    public function get_roulette_theme_list(WP_REST_Request $request)
    {
        $args = [
            'post_type'      => self::POST_TYPE,
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ];

        $query = new \WP_Query($args);
        $themes = [];

        foreach ($query->posts as $post) {
            // Get all meta data at once for better performance
            $meta = get_post_meta($post->ID);
            
            $themes[] = [
                'id'  => $post->ID,
                'name' => $post->post_title,
                'description' => $post->post_content,
                'created_at' => $post->post_date,
                'updated_at' => $post->post_modified,
                'wheelDataId' => maybe_unserialize($meta['wheelDataId'][0] ?? ''),
                'mustStartSpinning' => (bool) maybe_unserialize($meta['mustStartSpinning'][0] ?? false),
                'prizeNumber' => (int) maybe_unserialize($meta['prizeNumber'][0] ?? 0),
                'data' => maybe_unserialize($meta['data'][0] ?? []),
                'backgroundColors' => maybe_unserialize($meta['backgroundColors'][0] ?? []),
                'textColors' => maybe_unserialize($meta['textColors'][0] ?? []),
                'outerBorderColor' => maybe_unserialize($meta['outerBorderColor'][0] ?? '#000000'),
                'outerBorderWidth' => (int) maybe_unserialize($meta['outerBorderWidth'][0] ?? 5),
                'innerRadius' => (int) maybe_unserialize($meta['innerRadius'][0] ?? 0),
                'innerBorderColor' => maybe_unserialize($meta['innerBorderColor'][0] ?? '#000000'),
                'innerBorderWidth' => (int) maybe_unserialize($meta['innerBorderWidth'][0] ?? 0),
                'radiusLineColor' => maybe_unserialize($meta['radiusLineColor'][0] ?? '#000000'),
                'radiusLineWidth' => (int) maybe_unserialize($meta['radiusLineWidth'][0] ?? 5),
                'fontFamily' => maybe_unserialize($meta['fontFamily'][0] ?? 'Helvetica, Arial'),
                'fontSize' => (int) maybe_unserialize($meta['fontSize'][0] ?? 20),
                'fontWeight' => maybe_unserialize($meta['fontWeight'][0] ?? 'bold'),
                'fontStyle' => maybe_unserialize($meta['fontStyle'][0] ?? 'normal'),
                'perpendicularText' => (bool) maybe_unserialize($meta['perpendicularText'][0] ?? false),
                'textDistance' => (int) maybe_unserialize($meta['textDistance'][0] ?? 60),
                'spinDuration' => (int) maybe_unserialize($meta['spinDuration'][0] ?? 1),
                'startingOptionIndex' => (int) maybe_unserialize($meta['startingOptionIndex'][0] ?? 0),
                'pointerImageSource' => maybe_unserialize($meta['pointerImageSource'][0] ?? ''),
                'disableInitialAnimation' => (bool) maybe_unserialize($meta['disableInitialAnimation'][0] ?? false),
            ];
        }

        return $this->responseSuccess([
            'data' => $themes,
            'total' => count($themes),
            'current_page' => 1,
            'per_page' => count($themes),
        ]);
    }
}
