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
        if (empty($data['wheelDataId'])) {
            return $this->responseError('wheelDataId is required.');
        }

        // Validate theme name for new themes
        if (is_null($id) && empty($data['name'])) {
            return $this->responseError('Theme name is required.');
        }

        // Get Theme and validate
        $wheelData = get_post_meta($data['wheelDataId'], 'data', true);
        if (empty($wheelData)) {
            return $this->responseError('Invalid Theme.');
        }

        // Prepare data for validation
        $data['data'] = maybe_unserialize($wheelData);

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
        // Single theme by ID
        if ($id) {
            $post = get_post($id);
            if ($post && $post->post_type === self::POST_TYPE) {
                return $this->responseSuccess($this->prepare_theme_data($post));
            }

            return $this->responseError('Theme not found.');
        }

        // Pagination params
        $page     = max(1, (int) $request->get_param('page') ?: 1);
        $per_page = max(1, min(100, (int) $request->get_param('per_page') ?: 10));
        $offset   = ($page - 1) * $per_page;

        // Total count
        $total_posts = wp_count_posts(self::POST_TYPE);
        $total = 0;

        if ($total_posts && is_object($total_posts)) {
            $total = isset($total_posts->publish) ? (int) $total_posts->publish : 0;
        }

        if ($total === 0) {
            $count_query = new \WP_Query([
                'post_type'      => self::POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'fields'         => 'ids',
            ]);
            $total = $count_query->found_posts;
        }

        // Pagination calculations
        $last_page = (int) ceil($total / $per_page);
        $from      = $total > 0 ? $offset + 1 : 0;
        $to        = min($offset + $per_page, $total);

        // Base URL for links
        $current_url = home_url(add_query_arg(null, null));
        $base_url = remove_query_arg(['page'], $current_url);

        // Fetch paginated posts
        $post_ids = get_posts([
            'post_type'      => self::POST_TYPE,
            'post_status'    => 'publish',
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'offset'         => $offset,
            'orderby'        => 'ID',
            'order'          => 'DESC',
            'fields'         => 'ids',
        ]);

        $themes = [];
        foreach ($post_ids as $post_id) {
            $post = get_post($post_id);
            if ($post) {
                $themes[] = $this->prepare_theme_data($post);
            }
        }

        // Pagination URLs
        $first_page_url = add_query_arg(['page' => 1, 'per_page' => $per_page], $base_url);
        $last_page_url  = add_query_arg(['page' => $last_page, 'per_page' => $per_page], $base_url);
        $next_page_url  = $page < $last_page ? add_query_arg(['page' => $page + 1, 'per_page' => $per_page], $base_url) : null;
        $prev_page_url  = $page > 1 ? add_query_arg(['page' => $page - 1, 'per_page' => $per_page], $base_url) : null;

        return $this->responseSuccess([
            'data'             => $themes,
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

    private function prepare_theme_data(\WP_Post $post): array
    {
        $meta = get_post_custom($post->ID);

        $get = function (string $key, $default = null) use ($meta) {
            if (!isset($meta[$key][0])) return $default;
            $value = $meta[$key][0];
            return is_serialized($value) ? maybe_unserialize($value) : $value;
        };

        return [
            'id'                      => $post->ID,
            'name'                    => $post->post_title,
            'description'             => $post->post_content,
            'created_at'              => $post->post_date,
            'updated_at'              => $post->post_modified,
            'wheelDataId'             => $get('wheelDataId', ''),
            'mustStartSpinning'       => (bool) $get('mustStartSpinning', false),
            'prizeNumber'             => (int) $get('prizeNumber', 0),
            'data'                    => $get('data', []),
            'backgroundColors'        => $get('backgroundColors', []),
            'textColors'              => $get('textColors', []),
            'outerBorderColor'        => $get('outerBorderColor', '#000000'),
            'outerBorderWidth'        => (int) $get('outerBorderWidth', 5),
            'innerRadius'             => (int) $get('innerRadius', 0),
            'innerBorderColor'        => $get('innerBorderColor', '#000000'),
            'innerBorderWidth'        => (int) $get('innerBorderWidth', 0),
            'radiusLineColor'         => $get('radiusLineColor', '#000000'),
            'radiusLineWidth'         => (int) $get('radiusLineWidth', 5),
            'fontFamily'              => $get('fontFamily', 'Helvetica, Arial'),
            'fontSize'                => (int) $get('fontSize', 20),
            'fontWeight'              => $get('fontWeight', 'bold'),
            'fontStyle'               => $get('fontStyle', 'normal'),
            'perpendicularText'       => (bool) $get('perpendicularText', false),
            'textDistance'            => (int) $get('textDistance', 60),
            'spinDuration'            => (int) $get('spinDuration', 1),
            'startingOptionIndex'     => (int) $get('startingOptionIndex', 0),
            'pointerImageSource'      => $get('pointerImageSource', ''),
            'disableInitialAnimation' => (bool) $get('disableInitialAnimation', false),
        ];
    }
}
