import os
import sys
import wave
import threading
import pyaudio
import random
import string
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget

p = pyaudio.PyAudio()

os.makedirs("recordings", exist_ok=True)

class VoiceRecorderApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Voice Recorder for Voice Authentication")
        self.recording = False

        self.initUI()

    def initUI(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout()

        self.record_button = QPushButton("Record", self)
        self.record_button.clicked.connect(self.start_recording)
        layout.addWidget(self.record_button)

        self.record_owner_button = QPushButton("Record Owner", self)
        self.record_owner_button.clicked.connect(self.start_owner_recording)
        layout.addWidget(self.record_owner_button)

        self.stop_button = QPushButton("Stop", self)
        self.stop_button.clicked.connect(self.stop_recording)
        layout.addWidget(self.stop_button)

        self.status_label = QLabel("Press Record to start.", self)
        layout.addWidget(self.status_label)

        central_widget.setLayout(layout)

    def generate_random_string(self, length=8):
        """Generate a random string of fixed length."""
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for _ in range(length))

    def start_recording(self):
        self.recording = True
        self.status_label.setText("Recording...")
        threading.Thread(target=self.record).start()

    def start_owner_recording(self):
        self.recording = True
        self.status_label.setText("Recording owner...")
        threading.Thread(target=self.record, args=(True,)).start()

    def stop_recording(self):
        self.recording = False
        self.status_label.setText("Recording stopped.")

    def record(self, owner=False):
        chunk = 1024
        sample_format = pyaudio.paInt16
        channels = 1
        fs = 16000

        random_string = self.generate_random_string()
        if owner:
            filename = f"recordings/owner_{random_string}.wav"
        else:
            filename = f"recordings/recording_{random_string}.wav"

        stream = p.open(format=sample_format,
                        channels=channels,
                        rate=fs,
                        frames_per_buffer=chunk,
                        input=True)

        frames = []

        while self.recording:
            data = stream.read(chunk)
            frames.append(data)

        stream.stop_stream()
        stream.close()

        wf = wave.open(filename, 'wb')
        wf.setnchannels(channels)
        wf.setsampwidth(p.get_sample_size(sample_format))
        wf.setframerate(fs)
        wf.writeframes(b''.join(frames))
        wf.close()

        self.status_label.setText(f"Recording saved as {filename}")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = VoiceRecorderApp()
    window.show()
    sys.exit(app.exec_())

p.terminate()
