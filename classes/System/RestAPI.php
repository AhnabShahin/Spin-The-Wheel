<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Traits\ResponseTrait;

class RestAPI
{
    use ResponseTrait;
    private $database;

    public function __construct()
    {
        $this->database = new Database();
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes()
    {
        register_rest_route('stw/v1', '/settings/template', [
            [
                'methods' => 'GET',
                'callback' => [$this, 'get_template'],
                'permission_callback' => function () {
                    // return current_user_can('manage_options');
                    return true; // Allow public access for testing purposes
                }
            ],
            [
                'methods' => 'POST',
                'callback' => [$this, 'update_template'],
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                }
            ]
        ]);
    }

    public function get_template()
    {
        $this->addResponseMessage('success', 'Retrieving wheel template settings');
        return $this->responseSuccess(
            ['template' =>'sad'],
            'Template retrieved successfully'
        );
        return 'asd';
        $template = $this->database->get_setting('wheel_template') ?: 'classic';
    }

    public function update_template($request)
    {
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
