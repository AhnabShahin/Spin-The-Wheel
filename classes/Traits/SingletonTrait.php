<?php

namespace AhnabShahin\SpinTheWheel\Traits;

trait SingletonTrait
{
    private static $instance = [];

    public static function instance()
    {
        if (!isset(self::$instance[static::class])) {
            self::$instance[static::class] = new static();
        }

        return self::$instance[static::class];
    }
}
