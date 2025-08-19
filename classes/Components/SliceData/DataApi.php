<?php

namespace AhnabShahin\SpinTheWheel\Components\SliceData;

use AhnabShahin\SpinTheWheel\System\RestAPI;
use AhnabShahin\SpinTheWheel\System\Validator;
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


    public function get_(WP_REST_Request $request, ?int $id = null)
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
