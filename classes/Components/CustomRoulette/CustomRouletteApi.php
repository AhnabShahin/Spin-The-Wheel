<?php

namespace AhnabShahin\SpinTheWheel\Components\CustomRoulette;

use AhnabShahin\SpinTheWheel\System\RestAPI;
use AhnabShahin\SpinTheWheel\System\Validator;
use WP_Query;
use WP_REST_Request;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class CustomRouletteApi extends RestAPI
{
    private const POST_TYPE = 'stw_roulette';
    
    public function config(): void
    {
        $this->apiBasePrefix = 'roulette';
    }

    public function post_roulette(WP_REST_Request $request, ?int $id = null)
    {
        $data = $request->get_json_params() ?? [];

        // Basic validation
        if (empty($data['name'])) {
            return $this->responseError('Roulette name is required.');
        }

        if (empty($data['slices']) || !is_array($data['slices'])) {
            return $this->responseError('At least one slice is required.');
        }

        // Validate against unified rules
        $rules = CustomRouletteFields::get();
        $errors = Validator::instance()->make($data, $rules);
        if (!empty($errors)) {
            return $this->responseErrors(array_values($errors));
        }

        // Prepare post data
        $postData = [
            'post_title'   => sanitize_text_field($data['name']),
            'post_content' => sanitize_post($data['description'] ?? ''),
            'post_status'  => 'publish',
            'post_type'    => self::POST_TYPE,
            'post_author'  => get_current_user_id(),
        ];

        // Create or update post
        if (is_null($id)) {
            $id = wp_insert_post($postData);
            if (is_wp_error($id)) {
                return $this->responseError('Failed to create roulette: ' . $id->get_error_message());
            }
        } else {
            $postData['ID'] = $id;
            $result = wp_update_post($postData);
            if (is_wp_error($result)) {
                return $this->responseError('Failed to update roulette: ' . $result->get_error_message());
            }
        }

        // Store all data as meta fields
        $metaFields = [
            'slices',
            'mustStartSpinning',
            'prizeNumber',
            'outerBorderColor',
            'outerBorderWidth',
            'innerRadius',
            'innerBorderColor',
            'innerBorderWidth',
            'radiusLineColor',
            'radiusLineWidth',
            'fontFamily',
            'fontSize',
            'fontWeight',
            'fontStyle',
            'perpendicularText',
            'textDistance',
            'spinDuration',
            'startingOptionIndex',
            'pointerImageSource',
            'disableInitialAnimation'
        ];

        foreach ($metaFields as $field) {
            if (isset($data[$field])) {
                update_post_meta($id, $field, $data[$field]);
            }
        }

        // Get the created/updated roulette
        $roulette = $this->prepare_roulette_data(get_post($id));

        return $this->responseSuccess($roulette);
    }

    public function get_roulette(WP_REST_Request $request, ?int $id = null)
    {
        // Single roulette by ID
        if ($id) {
            $post = get_post($id);
            if ($post && $post->post_type === self::POST_TYPE) {
                return $this->responseSuccess($this->prepare_roulette_data($post));
            }

            return $this->responseError('Roulette not found.');
        }

        // Multiple roulettes with pagination
        $page = max(1, (int) $request->get_param('page') ?: 1);
        $per_page = max(1, min(100, (int) $request->get_param('per_page') ?: 10));
        $searchParam = $request->get_param('search');
        $search = is_string($searchParam) ? trim($searchParam) : '';
        $offset = ($page - 1) * $per_page;

        // Get total count
        $total_posts = wp_count_posts(self::POST_TYPE);
        $total = 0;
        
        if ($total_posts && is_object($total_posts)) {
            $total = isset($total_posts->publish) ? (int) $total_posts->publish : 0;
        }
        
        if ($total === 0) {
            $count_query = new WP_Query([
                'post_type'      => self::POST_TYPE,
                'post_status'    => 'publish',
                'posts_per_page' => -1,
                'fields'         => 'ids',
                'no_found_rows'  => false,
            ]);
            $total = $count_query->found_posts;
        }

        // Pagination calculations
        $last_page = ceil($total / $per_page);
        $from = $total > 0 ? $offset + 1 : 0;
        $to = min($offset + $per_page, $total);

        // Build URLs for pagination
        $current_url = home_url(add_query_arg(null, null));
        $base_url = remove_query_arg(['page'], $current_url);

        // Fetch posts
        $args = [
            'post_type'      => self::POST_TYPE,
            'posts_per_page' => $per_page,
            'paged'          => $page,
            'offset'         => $offset,
            'orderby'        => 'ID',
            'order'          => 'DESC',
            'post_status'    => 'publish',
            'fields'         => 'ids',
        ];

        if (!empty($search)) {
            $args['s'] = $search;
        }

        $post_ids = get_posts($args);

        $roulettes = [];
        foreach ($post_ids as $post_id) {
            $post = get_post($post_id);
            if ($post) {
                $roulettes[] = $this->prepare_roulette_data($post);
            }
        }

        // Build pagination URLs
        $first_page_url = add_query_arg(['page' => 1, 'per_page' => $per_page], $base_url);
        $last_page_url = add_query_arg(['page' => $last_page, 'per_page' => $per_page], $base_url);
        $next_page_url = $page < $last_page ? add_query_arg(['page' => $page + 1, 'per_page' => $per_page], $base_url) : null;
        $prev_page_url = $page > 1 ? add_query_arg(['page' => $page - 1, 'per_page' => $per_page], $base_url) : null;

        return $this->responseSuccess([
            'data'             => $roulettes,
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

    private function prepare_roulette_data(\WP_Post $post): array
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
            
            // Slices data
            'slices'                  => $get('slices', []),
            
            // Wheel configuration
            'mustStartSpinning'       => (bool) $get('mustStartSpinning', false),
            'prizeNumber'             => (int) $get('prizeNumber', 0),
            
            // Appearance
            'outerBorderColor'        => $get('outerBorderColor', '#000000'),
            'outerBorderWidth'        => (int) $get('outerBorderWidth', 5),
            'innerRadius'             => (int) $get('innerRadius', 0),
            'innerBorderColor'        => $get('innerBorderColor', '#000000'),
            'innerBorderWidth'        => (int) $get('innerBorderWidth', 0),
            'radiusLineColor'         => $get('radiusLineColor', '#000000'),
            'radiusLineWidth'         => (int) $get('radiusLineWidth', 5),
            
            // Typography
            'fontFamily'              => $get('fontFamily', 'Arial'),
            'fontSize'                => (int) $get('fontSize', 20),
            'fontWeight'              => $get('fontWeight', 400),
            'fontStyle'               => $get('fontStyle', 'normal'),
            'perpendicularText'       => (bool) $get('perpendicularText', false),
            'textDistance'            => (int) $get('textDistance', 60),
            
            // Animation
            'spinDuration'            => (int) $get('spinDuration', 1000),
            'startingOptionIndex'     => (int) $get('startingOptionIndex', 0),
            'disableInitialAnimation' => (bool) $get('disableInitialAnimation', false),
            
            // Pointer
            'pointerImageSource'      => $get('pointerImageSource', ''),
        ];
    }
}
