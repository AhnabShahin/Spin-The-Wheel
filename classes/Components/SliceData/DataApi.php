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
    private const POST_TYPE = 'roulette_theme_slice_data';
    public function config(): void
    {
        $this->apiBasePrefix = 'template';
    }

    public function post_slice_data(WP_REST_Request $request, ?int $id = null)
    {
        $rules = DataFields::get();
        $data = $request->get_json_params() ?? [];
        $errors = Validator::instance()->make($data, $rules);

        if (!empty($errors)) {
            return $this->responseErrors($errors);
        }

        if (is_null($id)) {
            return $this->responseError('Theme ID is required.');
        }
        $themeData = get_post($id);
        if (!$themeData) {
            return $this->responseError('Theme not found.');
        }

        update_post_meta($id, 'data', $data['sliceData'] ?? null);

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
