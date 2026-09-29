"""Gera os ícones do aplicativo (PWA) em PNG, sem bibliotecas externas.

Uso:  python3 fonte/icones.py

Grava ../icon-192.png, ../icon-512.png e ../apple-touch-icon.png (180 px).
O desenho fica dentro dos 80% centrais, para funcionar também como ícone
"maskable" (o Android pode recortar em círculo ou gota).
Só precisa rodar de novo se o desenho mudar.
"""
import os, struct, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
BERRY, CREAM, GOLD, ROSE = (0x6D, 0x2E, 0x46), (0xF6, 0xF0, 0xE6), (0xE0, 0xAE, 0x55), (0xD1, 0x9A, 0x9C)

def rect(x0, y0, x1, y1, r=0.0):
    """Retângulo com cantos arredondados, em coordenadas de 0 a 1."""
    def dentro(x, y):
        if not (x0 <= x <= x1 and y0 <= y <= y1): return False
        cx, cy = min(max(x, x0 + r), x1 - r), min(max(y, y0 + r), y1 - r)
        return (x - cx) ** 2 + (y - cy) ** 2 <= r * r + 1e-12
    return dentro

def star(cx, cy, ro, ri):  # (não usada neste projeto)
    """Estrela de 5 pontas."""
    import math
    pts = [(cx + (ro if i % 2 == 0 else ri) * math.sin(i * math.pi / 5), cy - (ro if i % 2 == 0 else ri) * math.cos(i * math.pi / 5)) for i in range(10)]
    def dentro(x, y):
        c = False
        for i in range(10):
            (xa, ya), (xb, yb) = pts[i], pts[i - 1]
            if (ya > y) != (yb > y) and x < (xb - xa) * (y - ya) / (yb - ya) + xa: c = not c
        return c
    return dentro

# desenho: fundo + formas (em ordem; a última por cima): livros na estante
PLANK = (0x8E, 0x6A, 0x55)
FORMAS = [
    (rect(0.25, 0.30, 0.36, 0.72, 0.015), CREAM),
    (rect(0.28, 0.36, 0.33, 0.39), BERRY),
    (rect(0.38, 0.24, 0.50, 0.72, 0.015), GOLD),
    (rect(0.41, 0.30, 0.47, 0.33), BERRY),
    (rect(0.52, 0.34, 0.62, 0.72, 0.015), ROSE),
    (rect(0.64, 0.28, 0.75, 0.72, 0.015), CREAM),
    (rect(0.67, 0.34, 0.72, 0.37), BERRY),
    (rect(0.20, 0.72, 0.80, 0.77, 0.012), PLANK),
]

def png(size, path, ss=3):
    linhas = []
    for py in range(size):
        linha = bytearray([0])
        for px in range(size):
            acc = [0, 0, 0]
            for sy in range(ss):
                for sx in range(ss):
                    x, y = (px + (sx + 0.5) / ss) / size, (py + (sy + 0.5) / ss) / size
                    cor = BERRY
                    for f, c in FORMAS:
                        if f(x, y): cor = c
                    acc = [a + b for a, b in zip(acc, cor)]
            linha += bytes(round(a / (ss * ss)) for a in acc)
        linhas.append(bytes(linha))
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    dados = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)) + \
            chunk(b"IDAT", zlib.compress(b"".join(linhas), 9)) + chunk(b"IEND", b"")
    open(path, "wb").write(dados)
    print("gerado:", os.path.relpath(path, os.path.join(HERE, "..")), f"({len(dados) // 1024} KB)")

if __name__ == "__main__":
    for size, nome in [(192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")]:
        png(size, os.path.join(HERE, "..", nome))
