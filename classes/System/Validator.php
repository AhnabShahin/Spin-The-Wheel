<?php

namespace AhnabShahin\SpinTheWheel\System;

class Validator
{
    /**
     * Validate data based on rules.
     *
     * @param array $data Input data (typically from REST request).
     * @param array $rules Rule definitions (string or nested arrays).
     * @param string $path Current path in dot notation for error tracking.
     * @return array List of validation errors.
     */
    public static function make(array $data, array $rules, string $path = ''): array
    {
        $errors = [];

        foreach ($rules ?? [] as $key => $rule) {
            $currentPath = $path ? "$path.$key" : $key;

            // Nested rule set — recurse
            if (is_array($rule) && !self::is_type_rule_array($rule)) {

                if (!isset($data[$key]) || !is_array($data[$key])) {
                    $errors[$currentPath] = "$currentPath must be an object/array.";
                    continue;
                }

                if (empty($data[$key])) {
                    continue; // Skip empty arrays unless required
                }


                $subErrors = self::make($data[$key], $rule, $currentPath);
                $errors = array_merge($errors, $subErrors);
                continue;
            }

            // Leaf rule (e.g. "string|required")
            if (!is_string($rule)) {
                $errors[$currentPath] = "$currentPath has an invalid rule definition.";
                continue;
            }

            // Parse rule parts
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

            // Check required
            if ($isRequired && !isset($data[$key])) {
                $errors[$currentPath] = "$currentPath is required.";
                continue;
            }

            // Check type only if the key is set
            if (isset($data[$key]) && $type && !self::validate_type($data[$key], $type)) {
                $errors[$currentPath] = "$currentPath must be of type $type.";
            }
        }

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
}
