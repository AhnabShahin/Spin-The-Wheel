<?php

namespace AhnabShahin\SpinTheWheel\Components\CustomRoulette;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class CustomRouletteFields
{
    public static function get()
    {
        return [
            // Basic information
            'name' => 'string|required',
            'description' => 'string',
            
            // Wheel slices data
            'slices' => [[
                'option' => 'string|required',
                'image' => [
                    'uri' => 'string',
                    'offsetX' => 'number',
                    'offsetY' => 'number',
                    'sizeMultiplier' => 'number',
                    'landscape' => 'boolean'
                ],
                'style' => [
                    'backgroundColor' => 'string',
                    'textColor' => 'string',
                    'fontFamily' => 'string',
                    'fontSize' => 'number',
                    'fontWeight' => 'number',
                    'fontStyle' => 'string'
                ],
                'optionSize' => 'number',
                'couponId' => 'string',
            ]],
            
            // Theme configuration
            'mustStartSpinning' => 'boolean',
            'prizeNumber' => 'number|required',
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
            'perpendicularText' => 'boolean',
            'textDistance' => 'number',
            'spinDuration' => 'number',
            'startingOptionIndex' => 'number',
            'pointerImageSource' => 'string',
            'disableInitialAnimation' => 'boolean'
        ];
    }
}
