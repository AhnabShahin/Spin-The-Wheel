<?php

namespace AhnabShahin\SpinTheWheel\System;

class RestAPI {
    private $database;

    public function __construct() {
        $this->database = new Database();
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        register_rest_route('stw/v1', '/settings/template', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_template'],
                'permission_callback' => function() {
                    return current_user_can('manage_options');
                }
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'update_template'],
                'permission_callback' => function() {
                    return current_user_can('manage_options');
                }
            ]
        ]);
    }

    public function get_template() {
        $template = $this->database->get_setting('wheel_template') ?: 'classic';
        return new \WP_REST_Response(['template' => $template], 200);
    }

    public function update_template($request) {
        $template = $request->get_param('template');
        
        if (!in_array($template, ['classic', 'modern'])) {
            return new \WP_Error(
                'invalid_template',
                'Invalid template type',
                ['status' => 400]
            );
        }

        $success = $this->database->update_setting('wheel_template', $template);

        if ($success) {
            return new \WP_REST_Response(['template' => $template], 200);
        } else {
            return new \WP_Error(
                'update_failed',
                'Failed to update template',
                ['status' => 500]
            );
        }
    }
}