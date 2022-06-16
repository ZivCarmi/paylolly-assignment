<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tasks>
 */
class TasksFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'task_name' => $this->faker->sentence(),
            'estimated_time' => $this->faker->dateTimeBetween('+0 days', '+1 month'),
            'status' => $this->faker->randomElement(['Remaining', 'Completed']),
        ];
    }
}
