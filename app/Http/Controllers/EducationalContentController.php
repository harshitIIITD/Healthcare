<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Video;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationalContentController extends Controller
{
    // Articles
    public function index()
    {
        $articles = Article::latest()->paginate(10);
        return Inertia::render('Educational/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function show(Article $article)
    {
        return Inertia::render('Educational/Articles/Show', ['article' => $article]);
    }

    // Videos
    public function videos()
    {
        $videos = Video::latest()->paginate(10);
        return Inertia::render('Educational/Videos/Index', [
            'videos' => $videos
        ]);
    }

    public function showVideo(Video $video)
    {
        return Inertia::render('Educational/Videos/Show', ['video' => $video]);
    }

    // Quizzes
    public function quizzes()
    {
        $quizzes = Quiz::latest()->paginate(10);
        return Inertia::render('Educational/Quizzes/Index', [
            'quizzes' => $quizzes
        ]);
    }

    public function showQuiz(Quiz $quiz)
    {
        return Inertia::render('Educational/Quizzes/Show', ['quiz' => $quiz]);
    }

    public function submitQuiz(Request $request, Quiz $quiz)
    {
        // Handle quiz submission and scoring
        // Implementation depends on how quizzes are structured
        return back()->with('success', 'Quiz submitted successfully!');
    }

    public function publicIndex()
    {
        $articles = Article::where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Public/Articles/Index', [
            'articles' => $articles
        ]);
    }

    public function publicShow($article)
    {
        $article = Article::where('is_public', true)
            ->where('id', $article)
            ->firstOrFail();

        return Inertia::render('Public/Articles/Show', [
            'article' => $article
        ]);
    }
}
