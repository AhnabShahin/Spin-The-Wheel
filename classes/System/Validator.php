<?php

namespace AhnabShahin\SpinTheWheel\System;

class Validator
{
    private function validate_data_recursively($data, $rules, $path = '')
    {
        $errors = [];

        foreach ($rules as $key => $rule) {
            $currentPath = $path ? "$path.$key" : $key;

            if (is_array($rule) && !$this->is_type_rule_array($rule)) {
                // Recursive call for nested array structure (e.g., data, pointerProps, etc.)
                if (!isset($data[$key]) || !is_array($data[$key])) {
                    $errors[$currentPath] = "$currentPath must be an object/array.";
                    continue;
                }
                $subErrors = $this->validate_data_recursively($data[$key], $rule, $currentPath);
                $errors = array_merge($errors, $subErrors);
            } else {
                // Flattened rule: e.g., "boolean|required"
                $required = str_contains($rule, 'required');
                $type = str_replace(['required|', '|required'], '', $rule);

                if ($required && !isset($data[$key])) {
                    $errors[$currentPath] = "$currentPath is required.";
                    continue;
                }

                if (isset($data[$key]) && !$this->validate_type($data[$key], $type)) {
                    $errors[$currentPath] = "$currentPath must be of type $type.";
                }
            }
        }

        return $errors;
    }

    private function validate_type($value, $type)
    {
        switch ($type) {
            case 'boolean':
                return is_bool($value);
            case 'string':
                return is_string($value);
            case 'number':
                return is_numeric($value);
            case 'array':
                return is_array($value);
            default:
                return false;
        }
    }

    private function is_type_rule_array(array $array): bool
    {
        // Heuristics: check if values are scalar type strings like 'string', 'number', etc.
        foreach ($array as $value) {
            if (is_array($value)) return false;
            if (!is_string($value)) return false;
        }
        return true;
    }
}
