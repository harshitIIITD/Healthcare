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
        Article::create([
            'title' => 'The Importance of Exercise',
            'content' => 'Content about exercise...',
            'author' => 'Dr. Johnson'
        ]);
        Article::create([
            'title' => 'Mental Health Tips',
            'content' => 'Content about mental health...',
            'author' => 'Dr. Brown'
        ]);

        // Seed Videos
        Video::create([
            'title' => 'Benefits of Regular Exercise',
            'url' => 'https://www.youtube.com/embed/yTL_bNvXJ9s',
            'description' => 'A video discussing the benefits of regular exercise.'
        ]);
        Video::create([
            'title' => 'Introduction to Health',
            'url' => 'https://www.youtube.com/embed/DltTwZcsj-A',
            'description' => 'Learn about basic health concepts'
        ]);
        Video::create([
            'title' => 'Healthy Eating',
            'url' => 'https://www.youtube.com/embed/uan3Aj0bHKc',
            'description' => 'A video discussing the importance of healthy eating.'
        ]);
        Video::create([
            'title' => 'Mental Health',
            'url' => 'https://www.youtube.com/embed/rkZl2gsLUp4',
            'description' => 'Learn about mental health and how to take care of it.'
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
        Quiz::create([
            'title' => 'Mental Health Quiz',
            'description' => 'Test your knowledge about mental health.',
            'questions' => [
                [
                    'question' => 'What is mental health?',
                    'type' => 'multiple-choice',
                    'options' => [
                        'The absence of mental illness',
                        'The ability to cope with stress',
                        'The ability to work productively',
                        'All of the above'
                    ]
                ]
            ]
        ]);

        
    }
}
