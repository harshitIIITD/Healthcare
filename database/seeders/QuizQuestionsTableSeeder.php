<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use App\Models\QuizAnswer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuizQuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'title' => 'How many hours of sleep are recommended for adults?',
                'answers' => [
                    ['answer_text' => '7-9 hours', 'is_correct' => true],
                    ['answer_text' => '4-5 hours', 'is_correct' => false],
                    ['answer_text' => '10-12 hours', 'is_correct' => false],
                ]
            ],
            [
                'title' => 'What is a healthy resting heart rate for adults?',
                'answers' => [
                    ['answer_text' => '60-100 beats per minute', 'is_correct' => true],
                    ['answer_text' => '40-50 beats per minute', 'is_correct' => false],
                    ['answer_text' => '100-120 beats per minute', 'is_correct' => false],
                ]
            ]
        ];

        foreach ($questions as $q) {
            $question = QuizQuestion::create([
                'title' => $q['title']
            ]);

            foreach ($q['answers'] as $a) {
                $question->answers()->create($a);
            }
        }
    }
}
