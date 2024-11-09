<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private $baseUrl;
    private $apiKey;
    private $collectionId;

    public function __construct()
    {
        $this->baseUrl = 'https://api.vultrinference.com/v1';
        $this->apiKey = 'RWY5HMOMGRM6NKOUODQ3ZAEINWD7GYPSJVYQ';
        $this->collectionId = 'new';
    }

    /**
     * Handle a chat completion message.
     */
    public function message(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $url = $this->baseUrl . '/chat/completions/RAG';

        $payload = [
            'collection' => $this->collectionId,
            'model' => 'llama2-7b-chat-Q5_K_M',
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $validated['message'],
                ],
            ],
            'max_tokens' => 512,
            'seed' => -1,
            'temperature' => 0.8,
            'top_k' => 40,
            'top_p' => 0.9,
        ];

        Log::info('API Request Payload: ' . json_encode($payload));

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($url, $payload);

            Log::info('API Response: ' . $response->body());

            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['choices'][0]['message']['content'])) {
                    $assistantMessage = $data['choices'][0]['message']['content'];
                    return response()->json([
                        'message' => $assistantMessage,
                    ]);
                } else {
                    Log::error('Unexpected API Response Structure', [
                        'response' => $data,
                    ]);
                    return response()->json([
                        'error' => 'Unexpected API response structure',
                    ], 500);
                }
            } else {
                Log::error('API Request failed with status: ' . $response->status(), [
                    'response' => $response->body(),
                ]);
                return response()->json([
                    'error' => 'API request failed',
                ], $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Exception during API request', [
                'exception' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => 'Exception during API request',
            ], 500);
        }
    }

    /**
     * Add content to the vector store.
     */
    public function addContent(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/vector_store/{$this->collectionId}/items", [
                'content' => $validated['content'],
                'description' => $validated['description'],
            ]);

            if ($response->successful()) {
                return response()->json([
                    'success' => true,
                    'item_id' => $response->json('id'),
                ], 201);
            }

            Log::error('Vector Store Error', [
                'status' => $response->status(),
                'response' => $response->body(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to add content to vector store.',
            ], $response->status());

        } catch (\Exception $e) {
            Log::error('addContent Exception', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An internal server error occurred. Please try again later.',
            ], 500);
        }
    }
}
