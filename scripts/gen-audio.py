"""
產生對話音檔（Piper 開源語音合成，離線執行）
用法：
  node scripts/audio-items.mjs > items.json
  python3 scripts/gen-audio.py items.json <voices資料夾>
需要：pip install piper-tts；ffmpeg；語音模型 es_ES-sharvard-medium、es_ES-davefx-medium
（https://huggingface.co/rhasspy/piper-voices）
輸出：public/audio/es/*.mp3 與 src/data/audio-manifest.json
"""
import hashlib, json, os, subprocess, sys, tempfile

items_file, voices_dir = sys.argv[1], sys.argv[2]
data = json.load(open(items_file, encoding='utf-8'))
lang = data['lang']
out_dir = os.path.join('public', 'audio', lang)
os.makedirs(out_dir, exist_ok=True)
manifest_path = os.path.join('src', 'data', 'audio-manifest.json')
manifest = json.load(open(manifest_path, encoding='utf-8')) if os.path.exists(manifest_path) else {}

V = lambda name: os.path.join(voices_dir, name + '.onnx')
# 聲音設定：(模型, speaker, 音高倍率)；F2 = 第二位女性，音高降低約 10%，速度不變
VOICE_SETS = {
    'es': {  # sharvard：CC BY 3.0（Sharvard Corpus）；davefx：CC0
        'F': (V('es_ES-sharvard-medium'), 1, 1.0),
        'F2': (V('es_ES-sharvard-medium'), 1, 0.9),
        'M': (V('es_ES-sharvard-medium'), 0, 1.0),
        'M2': (V('es_ES-davefx-medium'), None, 1.0),
    },
    'it': {  # paola：CC0；riccardo：M-AILABS Speech Dataset
        'F': (V('it_IT-paola-medium'), None, 1.0),
        'F2': (V('it_IT-paola-medium'), None, 0.9),
        'M': (V('it_IT-riccardo-x_low'), None, 1.0),
        'M2': (V('it_IT-riccardo-x_low'), None, 1.1),
    },
}
VOICES = VOICE_SETS[lang]

def fname(text, voice):
    return hashlib.sha1(f'{lang}|{voice}|{text}'.encode()).hexdigest()[:12] + '.mp3'

def synth(text, voice, dest):
    model, spk, pitch = VOICES[voice]
    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, 'a.wav')
        cmd = [sys.executable, '-m', 'piper', '-m', model, '-f', wav]
        rate = 22050 if 'x_low' not in model else 16000
        if spk is not None:
            cmd += ['--speaker', str(spk)]
        if len(text.split()) <= 3:  # 短詞放慢一點，比較清楚
            cmd += ['--length-scale', '1.15']
        subprocess.run(cmd, input=text.encode(), check=True, capture_output=True)
        # 去掉頭尾靜音，但保留 0.12 秒，避免切掉 f、s 這類輕聲的開頭
        trim = 'silenceremove=start_periods=1:start_threshold=-60dB:start_silence=0.12'
        af = f'{trim},areverse,{trim},areverse'
        if pitch != 1.0:
            af = f'asetrate={rate}*{pitch},aresample={rate},atempo={1 / pitch:.4f},' + af
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-af', af, '-ac', '1', '-ar', '22050', '-b:a', '48k', dest], check=True)

# ---- 品質檢查：用 Whisper 把音檔轉回文字，與原文比對；不理想就重新合成（最多 4 次，取最好的一次）
import difflib, re, shutil, unicodedata
try:
    import numpy as np
    from faster_whisper import WhisperModel
    ASR = WhisperModel('small', device='cpu', compute_type='int8')
except Exception:  # 沒裝 faster-whisper 就略過檢查
    ASR = None

U = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece',
     'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 'veintiuno', 'veintidos',
     'veintitres', 'veinticuatro', 'veinticinco', 'veintiseis', 'veintisiete', 'veintiocho', 'veintinueve']
T = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa']
H = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos']

def num_es(n):
    if n < 30: return U[n]
    if n < 100: return T[n // 10] + ('' if n % 10 == 0 else ' y ' + U[n % 10])
    if n == 100: return 'cien'
    if n < 1000: return H[n // 100] + ('' if n % 100 == 0 else ' ' + num_es(n % 100))
    return str(n)

IU = ['zero', 'uno', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci', 'undici', 'dodici',
      'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette', 'diciotto', 'diciannove']
IT_T = ['', '', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta', 'settanta', 'ottanta', 'novanta']

def num_it(n):
    if n < 20: return IU[n]
    if n < 100:
        t, u = IT_T[n // 10], n % 10
        if u in (1, 8): t = t[:-1]
        return t + ('' if u == 0 else ('tre' if u == 3 else IU[u]))
    if n < 1000:
        return ('cento' if n // 100 == 1 else IU[n // 100] + 'cento') + ('' if n % 100 == 0 else num_it(n % 100))
    return str(n)

def words(s):
    conv = num_it if lang == 'it' else num_es
    s = re.sub(r'\d+', lambda m: conv(int(m.group())), s.lower())
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9 ]', ' ', s).split()

def score(path, text):
    if not ASR: return 1.0
    # 前後補 0.5 秒靜音，Whisper 對極短的音檔才不會亂猜
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-af', 'adelay=500|500,apad=pad_dur=0.5', '-ar', '16000', '-ac', '1', '-f', 's16le', '-'], capture_output=True).stdout
    segs, _ = ASR.transcribe(np.frombuffer(raw, np.int16).astype(np.float32) / 32768, language=lang)
    return difflib.SequenceMatcher(None, words(text), words(' '.join(x.text for x in segs))).ratio()

made, low = 0, []
for it in data['items']:
    name = fname(it['text'], it['voice'])
    dest = os.path.join(out_dir, name)
    if not os.path.exists(dest):
        best = -1
        with tempfile.TemporaryDirectory() as tmp:
            for attempt in range(4):
                cand = os.path.join(tmp, f'{attempt}.mp3')
                synth(it['text'], it['voice'], cand)
                r = score(cand, it['text'])
                if r > best:
                    best = r
                    shutil.copy(cand, dest)
                if r >= 0.95: break
        made += 1
        if best < 0.8: low.append((round(best, 2), it['text']))
    manifest[f"{lang}|{it['text']}"] = f'audio/{lang}/{name}'

# 整段對話音檔：每句之間停 0.6 秒
for d in data['dialogues']:
    dest = os.path.join(out_dir, f"dialogue-{d['id']}.mp3")
    parts = [os.path.join(out_dir, os.path.basename(manifest[f'{lang}|{t}'])) for t in d['lines']]
    with tempfile.TemporaryDirectory() as tmp:
        sil = os.path.join(tmp, 'sil.mp3')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=22050:cl=mono', '-t', '0.6', '-b:a', '48k', sil], check=True)
        lst = os.path.join(tmp, 'list.txt')
        with open(lst, 'w') as f:
            for p in parts:
                f.write(f"file '{os.path.abspath(p)}'\nfile '{sil}'\n")
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-ac', '1', '-ar', '22050', '-b:a', '48k', dest], check=True)
    manifest[f"dialogue|{d['id']}"] = f"audio/{lang}/dialogue-{d['id']}.mp3"

with open(manifest_path, 'w', encoding='utf-8') as f:
    json.dump(dict(sorted(manifest.items())), f, ensure_ascii=False, indent=1)
print(f'generated {made} clips, {len(data["dialogues"])} dialogue tracks, manifest {len(manifest)} entries')
for r, t in low: print('  low ASR match', r, t)
