from langdetect import detect
from googleapiclient.discovery import build
from django.conf import settings

__translation_service = build('translate', 'v2',
                              developerKey=settings.GOOGLE_TRANSLATE_KEY)


def translate(source):
    """
    Return the original languages and the translation to english
    """
    assert settings.GOOGLE_TRANSLATE_KEY is not None
    source_lang = detect(source)
    translation = __translation_service.translations().list(source=source_lang,
                                                            target='en',
                                                            q=source).execute()

    return (source_lang, translation['translations'][0]['translatedText'],)
