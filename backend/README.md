[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект: Место (Backend часть)
##### Яндекс Практикум
#### Описание


#### Функционал
В проекте Место бэкенд выполняет задачи хранения профиля, аутентификации и авторизации пользователей.  
Авторизацией защищены все маршруты, кроме страницы регистрации и логина.  
Мидлвэр для централизованной обработки ошибок.
Реализовано логирование запросов и ошибок.

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
1. Клонируйте репозиторий на свой компьютер через командную строку.
2. Установите зависимости с помощью команды npm install.
3. Запустите проект с помощью команды npm run start.


#### Статус
Завершён

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

Ссылка на проект: https://arsenii400.github.io/express-mesto-gha/
