<?php
namespace AhnabShahin\SpinTheWheel\Components\RouletteTheme;

use AhnabShahin\SpinTheWheel\System\RestAPI;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class Api extends RestAPI
{

    public function config(): void
    {
        $this->prefix = 'template';
    }

    public function getRouletteList()
    {
        $roulettes = $this->database->get_all_roulettes();
        return $this->response($roulettes);
    }

    public function getRouletteById($id)
    {
    }
}
