[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект: Место (Backend часть)
##### Яндекс Практикум
#### Описание
Сервер для проекта Место.

#### Функционал
В проекте Место бэкенд выполняет задачи хранения профиля, аутентификации и авторизации пользователей.  
Авторизацией защищены все маршруты, кроме страницы регистрации и логина.  
Мидлвэр для централизованной обработки ошибок.  
Реализовано логирование запросов и ошибок.

##### Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
и др.

#### Технологии
* Node.js
* Express.js
* Mongo.db
* Joi
* Celebrate
* Mongoose

#### Инструкция по развёртыванию
###### Подготовка к развёртыванию
1. Установите [VS Code](https://code.visualstudio.com/Download "https://code.visualstudio.com/Download")
2. Установите [Node.js](https://nodejs.org/en/download/ "https://nodejs.org/en/download/")
###### Развёртывание
1. `git clone` — клонирует репозиторий на компьютер через командную строку
2. `npm install` — устанавливает зависимости
3. `npm run start` — запускает сервер   
4. `npm run dev` — запускает сервер с hot-reload


#### Статус
Завершён 

Ссылка на бэкенд: https://api.arsenii400.student.nomoredomains.icu
