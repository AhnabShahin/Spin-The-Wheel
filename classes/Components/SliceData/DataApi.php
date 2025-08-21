<?php

namespace AhnabShahin\SpinTheWheel\Components\SliceData;

use AhnabShahin\SpinTheWheel\System\RestAPI;
use AhnabShahin\SpinTheWheel\System\Validator;
use WP_Query;
use WP_REST_Request;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class DataApi extends RestAPI
{
    private const POST_TYPE = 'stw_wheel_data';
    public function config(): void
    {
        $this->apiBasePrefix = 'wheel';
    }

    public function post_data(WP_REST_Request $request, ?int $id = null)
    {
        $payload = $request->get_json_params() ?? [];
        $slices  = $payload['data'] ?? [];
        $name    = $payload['name'] ?? null;
        $desc    = $payload['description'] ?? '';

        // Basic validation
        if (empty($slices) || !is_array($slices)) {
            return $this->responseError('Slice data is required and must be an array.');
        }
        if (empty($name)) {
            return $this->responseError('Name is required.');
        }

        // Field validation
        $rules  = DataFields::get();
        $errors = Validator::instance()->make($slices, $rules);
        if (!empty($errors)) {
            return $this->responseErrors($errors);
        }

        // Common post data
        $postData = [
            'ID'           => $id ?? 0,
            'post_title'   => sanitize_text_field($name),
            'post_content' => sanitize_post($desc),
            'post_status'  => 'publish',
            'post_type'    => self::POST_TYPE,
            'post_author'  => get_current_user_id(),
        ];

        // Insert or update
        $id = $id ? wp_update_post($postData) : wp_insert_post($postData);

        if (is_wp_error($id)) {
            return $this->responseError($id->get_error_message());
        }

        update_post_meta($id, 'data', $slices);

        return $this->responseSuccess([
            'id'   => $id,
            'name' => sanitize_text_field($name),
            'data' => $slices,
        ]);
    }


    public function get_data(WP_REST_Request $request, ?int $id = null)
    {
        // Single record fetch
        if ($id) {
            $post = get_post($id);

            if ($post && $post->post_type === self::POST_TYPE) {
                return $this->responseSuccess([
                    'id'   => $post->ID,
                    'name' => $post->post_title,
                    'data' => maybe_unserialize(get_post_meta($post->ID, 'data', true)),
                ]);
            }

            return $this->responseError('Wheel data not found.');
        }

        // Multiple records fetch
        $page = max(1, (int) $request->get_param('page'));

        $posts = get_posts([
            'post_type'      => self::POST_TYPE,
            'posts_per_page' => 10,
            'paged'          => $page,
            'fields'         => 'ids', // fetch only IDs for better performance
        ]);

        $WheelData = array_map(function ($post_id) {
            return [
                'id'   => $post_id,
                'name' => get_the_title($post_id),
                'data' => maybe_unserialize(get_post_meta($post_id, 'data', true)),
            ];
        }, $posts);

        return $this->responseSuccess($WheelData);
    }
}
