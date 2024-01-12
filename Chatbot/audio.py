from pathlib import Path
from huggingface_hub import InferenceClient

token = "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"
client = InferenceClient(token=token)

t_model = "speechbrain/tts-tacotron2-ljspeech"

audio = client.text_to_speech(text="Hello world!", model=t_model)
Path("hello_world.wav").write_bytes(audio)

