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
        $page = max(1, (int) $request->get_param('page') ?: 1);
        $per_page = max(1, min(100, (int) $request->get_param('per_page') ?: 10));

        // Get total count for pagination
        $total_posts = wp_count_posts(self::POST_TYPE);
        $total = 0;
        
        // Safely get the published post count
        if ($total_posts && is_object($total_posts)) {
            $total = isset($total_posts->publish) ? (int) $total_posts->publish : 0;
        }
        
        // Fallback: if wp_count_posts fails, count manually
        if ($total === 0) {
            $count_query = new \WP_Query([
                'post_type'      => self::POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'no_found_rows'  => false,
            ]);
            $total = $count_query->found_posts;
        }

        // Calculate pagination data
        $last_page = ceil($total / $per_page);
        $offset = ($page - 1) * $per_page;
        $from = $total > 0 ? $offset + 1 : 0;
        $to = min($offset + $per_page, $total);

        // Build URLs for pagination
        $current_url = home_url(add_query_arg(null, null));
        $base_url = remove_query_arg(['page'], $current_url);
        
        // Fetch posts with pagination
        $posts = get_posts([
            'post_type'      => self::POST_TYPE,
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'offset'         => $offset,
            'orderby'        => 'ID',
            'order'          => 'DESC',
            'post_status'    => 'publish',
            'fields'         => 'ids', // fetch only IDs for better performance
        ]);

        $WheelData = array_map(function ($post_id) {
            $post = get_post($post_id);
            return [
                'id'         => $post_id,
                'name'       => get_the_title($post_id),
                'data'       => maybe_unserialize(get_post_meta($post_id, 'data', true)) ?: [],
                'created_at' => $post ? $post->post_date : null,
            ];
        }, $posts);

        // Build pagination URLs
        $first_page_url = add_query_arg(['page' => 1, 'per_page' => $per_page], $base_url);
        $last_page_url = add_query_arg(['page' => $last_page, 'per_page' => $per_page], $base_url);
        $next_page_url = $page < $last_page ? add_query_arg(['page' => $page + 1, 'per_page' => $per_page], $base_url) : null;
        $prev_page_url = $page > 1 ? add_query_arg(['page' => $page - 1, 'per_page' => $per_page], $base_url) : null;

        return $this->responseSuccess([
            'data'             => $WheelData,
            'current_page'     => $page,
            'first_page_url'   => $first_page_url,
            'from'             => $from,
            'last_page'        => $last_page,
            'last_page_url'    => $last_page_url,
            'next_page_url'    => $next_page_url,
            'path'             => $base_url,
            'per_page'         => $per_page,
            'prev_page_url'    => $prev_page_url,
            'to'               => $to,
            'total'            => $total,
        ]);
    }
}
