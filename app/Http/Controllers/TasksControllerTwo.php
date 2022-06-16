<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Carbon\Carbon;
// use App\Models\Tasks;
// use Exception;
// use Log;

// class TasksControllerTwo extends Controller
// {
//     // Get all tasks from Database
//     public function getTasks () {
//         try {
//             $tasks = Tasks::all();

//             foreach ($tasks as &$task) {
//                 // print_r(Carbon::parse($task->from_date)->format('d/m/Y H:i'));
//                 $task['created_at_formatted'] = Carbon::parse($task->from_date)->format('d/m/Y H:i');
//             }

//             return response()->json($tasks);
//         } catch (Exception $err) {
//             Log::error($err);
//         }
//     }

//     // Get all tasks from Database
//     public function updateTaskData (Request $request) {
//         try {
//             $tasks = Tasks::all();

//             foreach ($tasks as &$task) {
//                 // print_r(Carbon::parse($task->from_date)->format('d/m/Y H:i'));
//                 $task['created_at_formatted'] = Carbon::parse($task->from_date)->format('d/m/Y H:i');
//             }

//             return response()->json($tasks);
//         } catch (Exception $err) {
//             Log::error($err);
//         }
//     }
// }
