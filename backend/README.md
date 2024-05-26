# Backend на Django

Запуск из папки backend:

Создаём виртуальное окружение Python
```bash
python -m venv venv
```

Активируем данное виртуальное окружение
```bash
. venv/Scripts/activate
```

Устанавливаем требуемые библиотеки
```bash
pip install -r requirements.txt
```

Копируем [исходные данные (metrics_collector.tsv)](https://drive.google.com/drive/folders/1ym_jj7Q2siG8EQ2ZcV-et6F1KdK6-olU) в папку backend

Выполняем миграции БД:
```bash
python manage.py migrate
```

Запускаем backend-сервер:
```bash
python manage.py runserver 0.0.0.0:8000
```

Теперь по адресу http://127.0.0.1:8000/?tag_name=Throughput доступен ответ в формате JSON:
