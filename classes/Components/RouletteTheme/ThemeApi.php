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
        $rules = ThemeFields::get();
        $data = $request->get_json_params() ?? [];
        $errors = Validator::instance()->make($data, $rules);

        if (!empty($errors)) {
            return $this->responseBadRequest(array_values($errors));
        }

        // insert the roulette theme data into the post meta table for every key before that creating a new post id $id have if not been provided the creation of a new post 
        if (is_null($id)) {

            if (empty($data['theme_name'])) {
                return $this->responseError('Theme name is required.');
            }

            $postData = [
                'post_title'   => sanitize_text_field($data['theme_name']),
                'post_content' => sanitize_post($data['theme_description'] ?? ''),
                'post_status'  => 'publish',
                'post_type'    => self::POST_TYPE,
                'post_author'  => get_current_user_id(),
            ];

            $id = wp_insert_post($postData);
        }

        $postData = [
            'ID'           => $id,
            'post_title'   => sanitize_text_field($data['theme_name'] ?? ''),
            'post_content' => sanitize_post($data['theme_description'] ?? ''),
            'post_status'  => 'publish',
            'post_type'    => self::POST_TYPE,
            'post_author'  => get_current_user_id(),
        ];

        wp_update_post($postData);

        foreach (array_keys($rules) as $key) {
            update_post_meta($id, $key, $data[$key] ?? null);
        }

        // get the meta single . deserialize the data if needed
        $themeMeta = array_map(function ($meta) {
            return maybe_unserialize($meta[0]);
        }, get_post_meta($id));

        return $this->responseSuccess([
            'theme_id'  => $id,
            'theme_data' => get_post($id),
            'theme_meta' => $themeMeta
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
}
