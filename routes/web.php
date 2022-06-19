<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FiltersController;
use App\Http\Controllers\SortsController;
use App\Http\Controllers\TasksController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('tasks/filter_by/{filter_type}/{filter_value}', [FiltersController::class, 'filter_by']);
Route::post('tasks/sort_by/{sort_type}', [SortsController::class, 'sort_by']);
Route::get('tasks/filters', [FiltersController::class, 'index']);
Route::resource('tasks', TasksController::class);