<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Traits\ResponseTrait;
use WP_REST_Request;
use WP_REST_Server;

abstract class RestAPI
{
    use ResponseTrait;
    private string $projectPrefix           = 'stw';
    protected abstract string $prefix       = '';
    protected string|null $postActionParam  = null;
    protected string $version               = 'v1';
    protected WP_REST_Request|null $request = null;

    abstract public function config(): void;

    public function __construct()
    {
        $this->config(); // Set route config in child class
        $this->init();
    }

    protected function init(): void
    {
        add_action('rest_api_init', function () {
            register_rest_route(
                untrailingslashit($this->projectPrefix . '/' . $this->version . '/' . $this->prefix),
                '/(?P<action>\w+)' . ($this->postActionParam ? '/' . ltrim($this->postActionParam, '/') : ''),
                [
                    'methods'             => WP_REST_Server::ALLMETHODS,
                    'callback'            => [$this, 'dispatch'],
                    'permission_callback' => [$this, 'has_permission'],
                    'args'                => [
                        'page'  => [
                            'validate_callback' => fn($param) => is_numeric($param),
                        ],
                        'limit' => [
                            'validate_callback' => fn($param) => is_numeric($param),
                        ],
                    ],
                ]
            );
        });
    }

    /**
     * Permission callback (override in child if needed)
     */
    public function has_permission(): bool
    {
        return true; // Default open access; override in child
    }

    /**
     * Dispatcher for all API actions
     */
    public function dispatch(WP_REST_Request $request)
    {
        $this->request = $request;
        $action     = sanitize_key($request->get_url_params()['action']);
        $httpMethod = strtolower($request->get_method());
        $method     = "{$httpMethod}_{$action}";

        if (method_exists($this, $method)) {
            return $this->{$method}($request);
        }

        return $this->responseError("Action '$method' not implemented.", 404);
    }
}
