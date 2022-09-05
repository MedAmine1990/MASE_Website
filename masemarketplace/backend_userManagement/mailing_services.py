from django.core.mail import BadHeaderError, send_mail

def send_user_email(subject,message,source_email,destination_email):
    try:
        send_mail(subject, message, source_email, [destination_email])
    except BadHeaderError:
        return 'Invalid header'
