FROM php:8.2-apache

# تثبيت المتطلبات الأساسية
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# تنظيف الكاش
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# تفعيل إضافات لارافيل
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# تحميل Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# إعداد مجلد العمل
WORKDIR /var/www/html
COPY . .

# إنشاء قاعدة بيانات SQLite وإعطاء الصلاحيات
RUN mkdir -p database && touch database/database.sqlite
RUN chown -R www-data:www-data /var/www/html/database
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# ضبط مسار الـ Apache على مجلد public في لارافيل
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# تفعيل الـ Rewrite
RUN a2enmod rewrite

# --- الحل الجذري للإيرور: تعطيل كل المحركات المتضاربة بأمر أباتشي الرسمي، ثم تفعيل المحرك الأساسي فقط ---
RUN a2dismod mpm_event mpm_worker mpm_prefork 2>/dev/null; \
    a2enmod mpm_prefork && \
    apache2ctl -M 2>&1 | grep mpm

# تفعيل البورت الديناميكي وقت التشغيل وتمريره للأباتشي
CMD sed -i "s/Listen 80/Listen ${PORT:-8080}/g" /etc/apache2/ports.conf && \
    sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT:-8080}>/g" /etc/apache2/sites-available/000-default.conf && \
    apache2-foreground