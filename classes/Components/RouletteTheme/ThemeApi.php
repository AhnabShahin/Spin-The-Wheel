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

    public function get_roulette_theme_list(WP_REST_Request $request)
    {
        $args = [
            'post_type'      => self::POST_TYPE,
            'post_status'    => 'publish',
            'posts_per_page' => -1,
        ];

        $query = new \WP_Query($args);
        $themes = [];

        foreach ($query->posts as $post) {

            $themes[] = [
                'theme_id'  => $post->ID,
                "theme_name" => $post->post_title,
                "mustStartSpinning" => get_post_meta($post->ID, 'mustStartSpinning', true) ?: false,
                "prizeNumber" => get_post_meta($post->ID, 'prizeNumber', true) ?: 0,
                "data" => get_post_meta($post->ID, 'data', true) ?: [],
                "backgroundColors" => get_post_meta($post->ID, 'backgroundColors', true) ?: [],
                "textColors" => get_post_meta($post->ID, 'textColors', true) ?: [],
                "outerBorderColor" => get_post_meta($post->ID, 'outerBorderColor', true) ?: '#000000',
                "outerBorderWidth" => get_post_meta($post->ID, 'outerBorderWidth', true) ?: 5,
                "innerRadius" => get_post_meta($post->ID, 'innerRadius', true) ?: 0,
                "innerBorderColor" => get_post_meta($post->ID, 'innerBorderColor', true) ?: '#000000',
                "innerBorderWidth" => get_post_meta($post->ID, 'innerBorderWidth', true) ?: 0,
                "radiusLineColor" => get_post_meta($post->ID, 'radiusLineColor', true) ?: '#000000',
                "radiusLineWidth" => get_post_meta($post->ID, 'radiusLineWidth', true) ?: 5,
                "fontFamily" => get_post_meta($post->ID, 'fontFamily', true) ?: 'Helvetica, Arial',
                "fontSize" => get_post_meta($post->ID, 'fontSize', true) ?: 20,
                "fontWeight" => get_post_meta($post->ID, 'fontWeight', true) ?: 'bold',
                "fontStyle" => get_post_meta($post->ID, 'fontStyle', true) ?: 'normal',
                "perpendicularText" => get_post_meta($post->ID, 'perpendicularText', true) ?: false,
                "textDistance" => get_post_meta($post->ID, 'textDistance', true) ?: 60,
                "spinDuration" => get_post_meta($post->ID, 'spinDuration', true) ?: 1,
                "startingOptionIndex" => get_post_meta($post->ID, 'startingOptionIndex', true) ?: 0,
                "pointerProps" => get_post_meta($post->ID, 'pointerProps', true) ?: [],
                "disableInitialAnimation" => get_post_meta($post->ID, 'disableInitialAnimation', true) ?: false
            ];
        }

        return $this->responseSuccess($themes);
    }
}
