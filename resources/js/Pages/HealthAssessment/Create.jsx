import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import GeolocationButton from '@/Components/GeolocationButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        age: '',
        sex: '',
        height: '', // Add height field
        weight: '',
        blood_pressure_systolic: '',
        blood_pressure_diastolic: '',
        heart_rate: '',
        sleep_hours: '',
        exercise_minutes: '',
        smoking: false,
        alcohol_consumption: '',
        family_history: [],
        chronic_conditions: [],
        latitude: '',
        longitude: ''
    });

    const familyHistoryOptions = [
        'Heart Disease',
        'Diabetes',
        'Cancer',
        'Hypertension',
        'Stroke',
        'Mental Health Conditions'
    ];

    const chronicConditionsOptions = [
        'Diabetes',
        'Hypertension',
        'Heart Disease',
        'Asthma',
        'Arthritis',
        'Depression/Anxiety'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('health.store'));
    };

    const handleLocationUpdate = (location) => {
        setData(data => ({
            ...data,
            latitude: location.latitude,
            longitude: location.longitude
        }));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Health Assessment</h2>}
        >
            <Head title="Health Assessment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="age" value="Age" />
                                            <TextInput
                                                id="age"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.age}
                                                onChange={e => setData('age', e.target.value)}
                                            />
                                            <InputError message={errors.age} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sex" value="Sex" />
                                            <select
                                                id="sex"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                value={data.sex}
                                                onChange={e => setData('sex', e.target.value)}
                                            >
                                                <option value="">Select Sex</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <InputError message={errors.sex} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="height" value="Height (cm)" />
                                            <TextInput
                                                id="height"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.height}
                                                onChange={e => setData('height', e.target.value)}
                                                placeholder="Enter height in centimeters"
                                            />
                                            <InputError message={errors.height} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="weight" value="Weight (kg)" />
                                            <TextInput
                                                id="weight"
                                                type="number"
                                                step="0.1"
                                                className="mt-1 block w-full"
                                                value={data.weight}
                                                onChange={e => setData('weight', e.target.value)}
                                            />
                                            <InputError message={errors.weight} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Vital Signs */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel value="Blood Pressure (mmHg)" />
                                            <div className="flex gap-2">
                                                <TextInput
                                                    type="number"
                                                    placeholder="Systolic"
                                                    className="mt-1 block w-full"
                                                    value={data.blood_pressure_systolic}
                                                    onChange={e => setData('blood_pressure_systolic', e.target.value)}
                                                />
                                                <span className="mt-1">/</span>
                                                <TextInput
                                                    type="number"
                                                    placeholder="Diastolic"
                                                    className="mt-1 block w-full"
                                                    value={data.blood_pressure_diastolic}
                                                    onChange={e => setData('blood_pressure_diastolic', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="heart_rate" value="Heart Rate (bpm)" />
                                            <TextInput
                                                id="heart_rate"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.heart_rate}
                                                onChange={e => setData('heart_rate', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Lifestyle */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lifestyle</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="sleep_hours" value="Sleep Hours (per day)" />
                                            <TextInput
                                                id="sleep_hours"
                                                type="number"
                                                step="0.5"
                                                className="mt-1 block w-full"
                                                value={data.sleep_hours}
                                                onChange={e => setData('sleep_hours', e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="exercise_minutes" value="Exercise Minutes (per week)" />
                                            <TextInput
                                                id="exercise_minutes"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.exercise_minutes}
                                                onChange={e => setData('exercise_minutes', e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <InputLabel value="Do you smoke?" />
                                            <div className="mt-2">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                        checked={data.smoking}
                                                        onChange={e => setData('smoking', e.target.checked)}
                                                    />
                                                    <span className="ms-2">Yes</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="alcohol_consumption" value="Alcohol Consumption" />
                                            <select
                                                id="alcohol_consumption"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                value={data.alcohol_consumption}
                                                onChange={e => setData('alcohol_consumption', e.target.value)}
                                            >
                                                <option value="">Select frequency</option>
                                                <option value="never">Never</option>
                                                <option value="occasional">Occasional</option>
                                                <option value="moderate">Moderate</option>
                                                <option value="frequent">Frequent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="border-b border-gray-200 pb-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-600">
                                            Your location helps us connect you with nearby healthcare providers.
                                        </p>
                                        <GeolocationButton onLocationUpdate={handleLocationUpdate} />
                                        {data.latitude && data.longitude && (
                                            <p className="text-sm text-green-600">
                                                Location successfully captured!
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Medical History */}
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Medical History</h3>
                                    <div className="space-y-6">
                                        <div>
                                            <InputLabel value="Family History (select all that apply)" />
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {familyHistoryOptions.map((option) => (
                                                    <label key={option} className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                            value={option}
                                                            checked={data.family_history.includes(option)}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setData('family_history', 
                                                                    e.target.checked
                                                                        ? [...data.family_history, value]
                                                                        : data.family_history.filter(item => item !== value)
                                                                );
                                                            }}
                                                        />
                                                        <span className="ms-2">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel value="Chronic Conditions (select all that apply)" />
                                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {chronicConditionsOptions.map((option) => (
                                                    <label key={option} className="inline-flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                            value={option}
                                                            checked={data.chronic_conditions.includes(option)}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setData('chronic_conditions',
                                                                    e.target.checked
                                                                        ? [...data.chronic_conditions, value]
                                                                        : data.chronic_conditions.filter(item => item !== value)
                                                                );
                                                            }}
                                                        />
                                                        <span className="ms-2">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Submit Assessment
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}