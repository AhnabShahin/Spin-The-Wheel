<?php

class Spin_Wheel_API {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('spin-wheel/v1', '/verify-email', array(
            'methods' => 'POST',
            'callback' => array($this, 'verify_email'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('spin-wheel/v1', '/check-spin-limit', array(
            'methods' => 'POST',
            'callback' => array($this, 'check_spin_limit'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('spin-wheel/v1', '/generate-coupon', array(
            'methods' => 'POST',
            'callback' => array($this, 'generate_coupon'),
            'permission_callback' => '__return_true'
        ));
    }

    public function verify_email($request) {
        $email = sanitize_email($request['email']);
        
        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
        }

        // Check if email exists in our records
        global $wpdb;
        $table_name = $wpdb->prefix . 'spin_wheel_users';
        $user = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE email = %s", $email));

        if (!$user) {
            // New user - insert into database
            $wpdb->insert(
                $table_name,
                array('email' => $email, 'spins_remaining' => 3, 'last_spin' => current_time('mysql')),
                array('%s', '%d', '%s')
            );
        }

        return array('success' => true);
    }

    public function check_spin_limit($request) {
        $email = sanitize_email($request['email']);
        
        global $wpdb;
        $table_name = $wpdb->prefix . 'spin_wheel_users';
        $user = $wpdb->get_row($wpdb->prepare("SELECT * FROM $table_name WHERE email = %s", $email));

        if (!$user || $user->spins_remaining <= 0) {
            return array(
                'canSpin' => false,
                'message' => 'You have reached your spin limit for today.'
            );
        }

        // Check if 24 hours have passed since last spin
        $last_spin = strtotime($user->last_spin);
        $now = current_time('timestamp');
        if (($now - $last_spin) < DAY_IN_SECONDS) {
            return array(
                'canSpin' => false,
                'message' => 'Please wait 24 hours between spins.'
            );
        }

        return array('canSpin' => true);
    }

    public function generate_coupon($request) {
        $email = sanitize_email($request['email']);
        $prize = sanitize_text_field($request['prize']);

        // Update user's spin count
        global $wpdb;
        $table_name = $wpdb->prefix . 'spin_wheel_users';
        $wpdb->update(
            $table_name,
            array(
                'spins_remaining' => $wpdb->get_var($wpdb->prepare("SELECT spins_remaining - 1 FROM $table_name WHERE email = %s", $email)),
                'last_spin' => current_time('mysql')
            ),
            array('email' => $email),
            array('%d', '%s'),
            array('%s')
        );

        // Generate WooCommerce coupon
        $discount = (int)str_replace('%', '', $prize);
        $coupon_code = 'SPIN' . strtoupper(substr(uniqid(), -6));

        $coupon = array(
            'post_title' => $coupon_code,
            'post_content' => '',
            'post_status' => 'publish',
            'post_author' => 1,
            'post_type' => 'shop_coupon'
        );

        $new_coupon_id = wp_insert_post($coupon);

        // Set coupon data
        update_post_meta($new_coupon_id, 'discount_type', 'percent');
        update_post_meta($new_coupon_id, 'coupon_amount', $discount);
        update_post_meta($new_coupon_id, 'individual_use', 'yes');
        update_post_meta($new_coupon_id, 'usage_limit', '1');
        update_post_meta($new_coupon_id, 'expiry_date', date('Y-m-d', strtotime('+7 days')));
        update_post_meta($new_coupon_id, 'customer_email', array($email));

        return array(
            'success' => true,
            'couponCode' => $coupon_code
        );
    }
}

new Spin_Wheel_API();