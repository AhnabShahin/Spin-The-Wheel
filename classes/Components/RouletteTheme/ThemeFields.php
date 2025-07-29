<?php

namespace AhnabShahin\SpinTheWheel\Components\RouletteTheme;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ThemeFields
{
    public static function get()
    {
        return [
            'mustStartSpinning' => 'boolean|required',
            'prizeNumber' => 'number|required',
            'data' => 'array|required',
            'backgroundColors' => 'array',
            'textColors' => 'array',
            'outerBorderColor' => 'string',
            'outerBorderWidth' => 'number',
            'innerRadius' => 'number',
            'innerBorderColor' => 'string',
            'innerBorderWidth' => 'number',
            'radiusLineColor' => 'string',
            'radiusLineWidth' => 'number',
            'fontFamily' => 'string',
            'fontSize' => 'number',
            'fontWeight' => 'number',
            'fontStyle' => 'string',
            "perpendicularText" => "boolean",
            "textDistance" => "number",
            "spinDuration" => "number",
            "startingOptionIndex" => "number",
            "pointerProps" => [
                "src" => "string",
                "style" => "array"
            ],
            "disableInitialAnimation" => "boolean"
        ];
    }
}
