<?php
namespace AhnabShahin\SpinTheWheel\Components;

use AhnabShahin\SpinTheWheel\System\RestAPI;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}
class Roulette extends RestAPI
{

    public function __construct()
    {
        parent::__construct();
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
