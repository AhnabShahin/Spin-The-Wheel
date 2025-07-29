<?php

namespace AhnabShahin\SpinTheWheel\Components\SliceData;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class DataFields
{
    public static function get()
    {
        return [
            'sliceData' => [[
                'option' => 'string|required',
                'image' => [
                    'uri' => 'string|required',
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
            ]]
        ];
    }
}
