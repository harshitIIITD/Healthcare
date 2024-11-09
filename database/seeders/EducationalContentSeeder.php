<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Video;
use App\Models\Quiz;

class EducationalContentSeeder extends Seeder
{
    public function run()
    {
        // Seed Articles
        Article::create([
            'title' => 'Healthy Eating Habits',
            'content' => 'Content about healthy eating...',
            'author' => 'Dr. Smith'
        ]);

        // Seed Videos
        Video::create([
            'title' => 'Benefits of Regular Exercise',
            'url' => 'https://www.youtube.com/embed/example',
            'description' => 'A video discussing the benefits of regular exercise.'
        ]);
        Video::create([
            'title' => 'Introduction to Health',
            'url' => 'https://www.youtube.com/embed/example',
            'description' => 'Learn about basic health concepts'
        ]);

        // Seed Quizzes
        Quiz::create([
            'title' => 'Nutrition Knowledge Quiz',
            'description' => 'Test your knowledge about nutrition.',
            'questions' => [
                [
                    'question' => 'What is a balanced diet?',
                    'type' => 'multiple-choice',
                    'options' => [
                        'Only proteins',
                        'Fruits and vegetables',
                        'A mix of carbohydrates, proteins, and fats',
                        'Only carbohydrates'
                    ]
                ]
            ]
        ]);
    }
}
