<?php

namespace AhnabShahin\SpinTheWheel\System;

use AhnabShahin\SpinTheWheel\Traits\SingletonTrait;

class Validator
{
    use SingletonTrait;

    private array $errors         = [];
    private array $fillableFields = [];
    /**
     * Validate data based on rules.
     *
     * @param array $data Input data (typically from REST request).
     * @param array $rules Rule definitions (string or nested arrays).
     * @param string $path Current path in dot notation for error tracking.
     * @return array List of validation errors.
     */
    public function make(array $data, array $rules, string $path = ''): array
    {
        foreach ($rules ?? [] as $key => $rule) {
            $currentPath = $path ? "$path.$key" : $key;

            if (!array_key_exists($key, $data)) {
                if (is_string($rule) && str_contains($rule, 'required')) {
                    $this->errors [$currentPath] = "$currentPath is required.";
                }
                continue;
            }

            $value = $data[$key];

            // Case 1: rule is a single nested object schema
            if (is_array($rule) && self::is_assoc($rule)) {
                if (!is_array($value)) {
                    $this->errors [$currentPath] = "$currentPath must be an object.";
                    continue;
                }
                $subErrors = self::make($value, $rule, $currentPath);
                $this->errors = array_merge($this->errors, $subErrors);
                continue;
            }

            // Case 2: rule is an array of one schema → validate each item in array
            if (is_array($rule) && isset($rule[0]) && is_array($rule[0])) {
                if (!is_array($value)) {
                    $this->errors [$currentPath] = "$currentPath must be an array.";
                    continue;
                }

                foreach ($value as $index => $item) {
                    if (!is_array($item)) {
                        $this->errors ["{$currentPath}[$index]"] = "{$currentPath}[$index] must be an object.";
                        continue;
                    }

                    $subPath = "{$currentPath}[$index]";
                    $subErrors = self::make($item, $rule[0], $subPath);
                    $this->errors = array_merge($this->errors , $subErrors);
                }

                continue;
            }

            // Case 3: leaf field like "string|required"
            if (is_string($rule)) {
                $ruleParts = explode('|', $rule);
                $type = null;
                $isRequired = false;

                foreach ($ruleParts as $part) {
                    if ($part === 'required') {
                        $isRequired = true;
                    } else {
                        $type = $part;
                    }
                }

                if ($isRequired && $value === null) {
                    $this->errors [$currentPath] = "$currentPath is required.";
                    continue;
                }

                if ($value !== null && $type && !self::validate_type($value, $type)) {
                    $this->errors [$currentPath] = "$currentPath must be of type $type.";
                }
            }
        }
        $errors = $this->errors;
        $this->errors = []; // Clear errors after retrieval
        return $errors;
    }

    /**
     * Type checker for values.
     */
    private static function validate_type($value, string $type): bool
    {
        return match ($type) {
            'boolean' => is_bool($value),
            'string'  => is_string($value),
            'number'  => is_numeric($value),
            'array'   => is_array($value),
            default   => false
        };
    }

    /**
     * Determine if a rule array is a flat field-type map (e.g., ['src' => 'string'])
     */
    private static function is_type_rule_array(array $array): bool
    {
        foreach ($array as $value) {
            if (!is_string($value)) return false;
        }
        return true;
    }

    private static function is_assoc(array $arr): bool
    {
        if ([] === $arr) return false;
        return array_keys($arr) !== range(0, count($arr) - 1);
    }
}
