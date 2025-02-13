<?php

class Spin_Wheel_Theme_API {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('spin-wheel/v1', '/wheel-themes', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_themes'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('spin-wheel/v1', '/wheel-themes', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_theme'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('spin-wheel/v1', '/wheel-themes/(?P<id>\d+)', array(
            'methods' => 'DELETE',
            'callback' => array($this, 'delete_theme'),
            'permission_callback' => '__return_true'
        ));
    }

    public function get_themes() {
        $themes = get_option('spin_wheel_themes', array());
        return rest_ensure_response($themes);
    }

    public function save_theme($request) {
        $theme_data = $request->get_params();
        $themes = get_option('spin_wheel_themes', array());

        // Validate and sanitize wheel properties
        $wheel_props = array(
            'mustStartSpinning' => false,
            'prizeNumber' => 0,
            'data' => array(),
            'onStopSpinning' => null,
            'backgroundColors' => array('darkgrey', 'lightgrey'),
            'textColors' => array('black'),
            'outerBorderColor' => 'black',
            'outerBorderWidth' => 5,
            'innerRadius' => 0,
            'innerBorderColor' => 'black',
            'innerBorderWidth' => 0,
            'radiusLineColor' => 'black',
            'radiusLineWidth' => 5,
            'fontFamily' => 'Helvetica, Arial',
            'fontSize' => 20,
            'fontWeight' => 'bold',
            'fontStyle' => 'normal',
            'perpendicularText' => false,
            'textDistance' => 60,
            'spinDuration' => 1.0,
            'startingOptionIndex' => 0,
            'pointerProps' => array(
                'src' => '',
                'style' => array()
            ),
            'disableInitialAnimation' => false
        );

        // Merge provided data with defaults
        foreach ($wheel_props as $key => $default_value) {
            if (!isset($theme_data[$key])) {
                $theme_data[$key] = $default_value;
            }
        }

        if (isset($theme_data['id'])) {
            // Update existing theme
            $theme_index = array_search($theme_data['id'], array_column($themes, 'id'));
            if ($theme_index !== false) {
                $themes[$theme_index] = $theme_data;
            }
        } else {
            // Create new theme
            $theme_data['id'] = time(); // Use timestamp as ID
            $themes[] = $theme_data;
        }

        update_option('spin_wheel_themes', $themes);

        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Theme saved successfully',
            'theme' => $theme_data
        ));
    }

    public function delete_theme($request) {
        $theme_id = $request['id'];
        $themes = get_option('spin_wheel_themes', array());

        $theme_index = array_search($theme_id, array_column($themes, 'id'));
        if ($theme_index !== false) {
            array_splice($themes, $theme_index, 1);
            update_option('spin_wheel_themes', $themes);

            return rest_ensure_response(array(
                'success' => true,
                'message' => 'Theme deleted successfully'
            ));
        }

        return new WP_Error(
            'theme_not_found',
            'Theme not found',
            array('status' => 404)
        );
    }
}

new Spin_Wheel_Theme_API();