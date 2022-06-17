<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tasks;
use Carbon\Carbon;
use Exception;
use Log;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $tasks = Tasks::orderBy('id', 'DESC')->get();

            foreach ($tasks as &$task) {
                $task['created_at_formatted'] = Carbon::parse($task->from_date)->format('d/m/Y');
                // $task['estimated_time'] = Carbon::parse($task['estimated_time'])->format('d/m/Y');
            }

            return response()->json($tasks);
        } catch (Exception $err) {
            Log::error($err);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'taskName' => 'required',
            'estDate' => 'required|date',
        ]);

        $inserted_task = Tasks::create([
            'task_name' => $request->taskName,
            'estimated_time' => Carbon::parse($request->estDate)->addDay()->startOfDay(),
            'status' => 'Remaining',
        ]);

        return response()->json($inserted_task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    public function update_status(Request $request, $id)
    {
        return response()->json('update_status');
        // print_r();
        // if ($request->keys('taskStatus')) {
            
        //     $validated = $request->validate([
        //         'taskName' => 'required|in:Remaining,Completed',
        //     ]);
        // }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->has('taskStatus')) {
            $validated = $request->validate([
                'taskStatus' => 'required|in:Remaining,Completed',
            ]);

            $updated_task = [
                'status' => $request->get('taskStatus') == 'Completed' ? 'Remaining' : 'Completed',
            ];
        } else {
            $validated = $request->validate([
                'taskName' => 'required',
                'estDate' => 'required|date',
            ]);
            
            $updated_task = [
                'task_name' => $request->taskName,
                'estimated_time' => Carbon::parse($request->estDate)->startOfDay(),
            ];
        }

        Tasks::where('id', $id)->update($updated_task);

        return response()->json($updated_task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Tasks::find($id);
        
        if ($task['status'] != 'Completed') {
            $task_estimated_time = Carbon::createFromFormat('Y-m-d', $task['estimated_time']);
            
            $now = Carbon::now()->startOfDay();
            
            $days_difference = $now->diffInDays($task_estimated_time);
    
            if ($days_difference > 6) {
                return response()->json('Not allowed to delete tasks older than 6 days.');
            }
        }

        $task = $task->delete();

        return response()->json($task);
    }
}
