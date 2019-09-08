json.content @message.content
json.image @message.image.url
json.user @message.user_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.id @message.id
