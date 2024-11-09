<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'openweathermap' => [
        'key' => env('OPENWEATHERMAP_API_KEY'),
        'url' => env('OPENWEATHERMAP_API_URL', 'https://api.openweathermap.org/data/2.5'),
    ],

    'vultr' => [
        'base_url' => env('VULTR_BASE_URL', 'https://api.vultrinference.com/v1'),
        'inference_key' => env('VULTR_INFERENCE_KEY'),
        'collection_id' => env('VULTR_COLLECTION_ID', 'new'),
    ],

];
