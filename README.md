# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|nickname|string |null: false|
|e-mail|string |null: false|
|password|string |null: false|
### Association
- has_many : groups, through: :user_group
- has_many : tweets


## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|groupe_id|integer|null: false|
### Association
- belongs_to : user
- belongs_to : group


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many : users, through: :user_group
- has_many : tweets


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|
|message|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to : user
- belongs_to : group


* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
