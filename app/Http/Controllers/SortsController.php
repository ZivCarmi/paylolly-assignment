<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;

class SortsController extends Controller
{
    public function sort_by (Request $request, $sort_type) {
        $available_sortings = ['name', 'date', 'status'];

        $validated = $request->validate([
            'task_ids' => 'required|array',
            'task_ids.*' => 'integer',
        ]);

        if (!in_array($sort_type, $available_sortings)) return response(['message' => 'Sort type not exist!'], 400);

        $task_ids = implode(',', $request->get('task_ids'));

        if ($sort_type == 'name') {
            $tasks = Tasks::whereIn('id', $request->get('task_ids'))->orderBy('task_name')->get();
        } elseif ($sort_type == 'date') {
            $tasks = Tasks::whereIn('id', $request->get('task_ids'))->orderBy('estimated_time')->get();
        } elseif ($sort_type == 'status') {
            $tasks = Tasks::whereIn('id', $request->get('task_ids'))->orderBy('status')->get();
        }

        return response()->json($tasks);
    }
}
