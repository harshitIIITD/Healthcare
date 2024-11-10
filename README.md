
## Accessing the Application


Visit [http://139.84.170.84](http://139.84.170.84) to access the application.


Default credentials:
- Email: admin@example.com
- Password: password

## I have created a gradio based mri analysis application
Visit [https://huggingface.co/spaces/hjvsf/mri](https://huggingface.co/spaces/hjvsf/mri) to access the application.



# Healthcare Management System


A comprehensive healthcare management web application built with Laravel, React, and Vultr cloud services. The system provides health assessments, MRI analysis, wellness planning, and educational content.


## Features


- Health Assessment Tools
- MRI Analysis and Visualization 
- Personalized Wellness Plans
- Educational Content
- Real-time Health Insights
- Interactive Dashboard
- Secure Authentication
- Expert Chat Support


## Prerequisites


- PHP 8.2+
- Node.js 16+
- Composer
- MySQL/PostgreSQL
- Vultr Object Storage credentials


## Installation


1. Clone the repository:


```bash
git clone https://github.com/harshitIIITD/Healthcare.git
cd Healthcare
```


2. Install PHP dependencies:


```bash 
composer install
```


3. Install Node.js dependencies:


```bash
npm install
```


4. Configure environment variables:


```bash
cp .env.example .env
```


Update the following variables in 


.env


:


```
APP_URL=http://139.84.170.84


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password


VULTR_ENDPOINT=https://del1.vultrobjects.com
VULTR_ACCESS_KEY=your_access_key
VULTR_SECRET_KEY=your_secret_key
VULTR_REGION=del1
VULTR_BUCKET=your_bucket
```


5. Generate application key:


```bash
php artisan key:generate
```


6. Run database migrations:


```bash
php artisan migrate
```


7. Link storage:


```bash
php artisan storage:link
```


8. Build frontend assets:


```bash
npm run build
```


## Running the Application


For development:


```bash
# Terminal 1 - Laravel server
php artisan serve


# Terminal 2 - Vite development server
npm run dev
```


For production:


```bash
npm run build
php artisan config:cache
php artisan route:cache
php artisan view:cache
```


## Accessing the Application


Visit [http://139.84.170.84](http://139.84.170.84) to access the application.


Default credentials:
- Email: admin@example.com
- Password: password


## API Documentation


The API documentation is available at `/docs` endpoint when running in development mode.


## Testing


Run test suite:


```bash
php artisan test
```


## Deployment


1. Configure your web server (Nginx/Apache) to point to the 


public


 directory
2. Set appropriate permissions:


```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```


3. Set up SSL certificate
4. Configure database backups
5. Set up queue worker:


```bash
php artisan queue:work
```


## Contributing


1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## Security


If you discover any security vulnerabilities, please email nhk2harshit@gmail.com.


## License


This application is licensed under the MIT license.


## Support


For support, email nhk2harshit@gmail.com or create an issue in the repository.
