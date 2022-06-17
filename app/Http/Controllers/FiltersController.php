<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use Carbon\Carbon;

class FiltersController extends Controller
{
    public function index () {
        return response()->json([
            'statuses' => self::$global_data['all_statuses'],
        ]);
    }

    public function filter_by ($filter_type, $filter_value) {
        if ($filter_type == 'filter_status') {

            if ($filter_value == 'All') {
                $tasks = Tasks::orderBy('id', 'DESC')->get();
            } else {
                if (!in_array($filter_value, self::$global_data['all_statuses'])) return response(['message' => 'Filter not exist!'], 400);

                $tasks = Tasks::get()->where('status', $filter_value)->values();
            }

        } elseif ($filter_type == 'filter_date') {
            $filter_value = explode(',', $filter_value);

            foreach ($filter_value as &$date) {
                $date = Carbon::createFromFormat('D M d Y H:i:s e+', $date);
            }

            $tasks = Tasks::whereBetween('estimated_time', [$filter_value[0], $filter_value[1]])->get();
        }
        
        return response()->json($tasks);
    }
}
