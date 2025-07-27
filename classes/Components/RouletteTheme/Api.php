<?php

namespace AhnabShahin\SpinTheWheel\Components\RouletteTheme;

use AhnabShahin\SpinTheWheel\System\RestAPI;
use AhnabShahin\SpinTheWheel\System\Validator;
use WP_HTTP_Response;
use WP_REST_Request;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class Api extends RestAPI
{
    public function config(): void
    {
        $this->apiBasePrefix = 'template';
    }

    public function post_roulette_theme(WP_REST_Request $request): WP_HTTP_Response|array|null
    {
        $rules = Fields::get();
        $data = $request->get_json_params()?? [];
        $errors = Validator::make($data, $rules);

        if (!empty($errors)) {
            return new \WP_REST_Response(['errors' => $errors], 422);
        }
        
        return $this->responseError('No roulette theme found.');
    }
}
