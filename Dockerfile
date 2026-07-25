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

# --- الحل الجذري للإيرور: حذف المحركات المتضاربة بالقوة وتفعيل المحرك الأساسي فقط ---
RUN rm -f /etc/apache2/mods-enabled/mpm_event.load \
          /etc/apache2/mods-enabled/mpm_worker.load \
          /etc/apache2/mods-enabled/mpm_event.conf \
          /etc/apache2/mods-enabled/mpm_worker.conf
RUN a2enmod mpm_prefork

# تفعيل البورت الديناميكي وقت التشغيل وتمريره للأباتشي
CMD sed -i "s/Listen 80/Listen ${PORT:-8080}/g" /etc/apache2/ports.conf && \
    sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT:-8080}>/g" /etc/apache2/sites-available/000-default.conf && \
    apache2-foreground